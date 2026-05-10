"use strict";

const { google } = require("googleapis");
const { DateTime } = require("luxon");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

/** Trim wrapping quotes and internal whitespace — avoids invalid_client from pasted credentials */
function normalizeGoogleEnv(raw) {
  if (raw == null || raw === "") return "";
  let s = String(raw).trim().replace(/^['"]|['"]$/g, "");
  s = s.replace(/\s+/g, "");
  return s;
}

/** Matches scheduler.html CONFIG.baseTimes */
const BASE_SLOT_TIMES = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "5:30 PM",
];

function parseDateParts(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr));
  if (!m) return null;
  return { y: +m[1], mo: +m[2], d: +m[3] };
}

function parse12h(timeStr) {
  const m = String(timeStr)
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return { h, min };
}

function getOAuth2Client() {
  const clientId = normalizeGoogleEnv(process.env.GOOGLE_CLIENT_ID);
  const clientSecret = normalizeGoogleEnv(process.env.GOOGLE_CLIENT_SECRET);
  const redirectUri = normalizeGoogleEnv(process.env.GOOGLE_REDIRECT_URI);
  if (!clientId || !clientSecret || !redirectUri) return null;
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

function oauthClientConfigured() {
  return !!(
    normalizeGoogleEnv(process.env.GOOGLE_CLIENT_ID) &&
    normalizeGoogleEnv(process.env.GOOGLE_CLIENT_SECRET) &&
    normalizeGoogleEnv(process.env.GOOGLE_REDIRECT_URI)
  );
}

function calendarFullyConfigured() {
  return !!(
    oauthClientConfigured() &&
    normalizeGoogleEnv(process.env.GOOGLE_REFRESH_TOKEN)
  );
}

/** Safe booleans for /api/calendar/status — never exposes secrets */
function getIntegrationStatus() {
  const hasRt = !!normalizeGoogleEnv(process.env.GOOGLE_REFRESH_TOKEN);
  const oauth = oauthClientConfigured();
  const enabled = oauth && hasRt;
  const explicitCal = !!(process.env.GOOGLE_CALENDAR_ID && String(process.env.GOOGLE_CALENDAR_ID).trim());
  return {
    enabled,
    oauthClientConfigured: oauth,
    hasRefreshToken: hasRt,
    usingExplicitCalendarId: explicitCal,
    timeZone: getTimeZone(),
    slotDurationMinutes: getSlotDurationMinutes(),
  };
}

async function getCalendarApi() {
  const oauth2 = getOAuth2Client();
  if (!oauth2) {
    const err = new Error("Google OAuth env not configured");
    err.code = "NOT_CONFIGURED";
    throw err;
  }
  const refreshToken = normalizeGoogleEnv(process.env.GOOGLE_REFRESH_TOKEN);
  if (!refreshToken) {
    const err = new Error("GOOGLE_REFRESH_TOKEN not set");
    err.code = "NOT_CONFIGURED";
    throw err;
  }
  oauth2.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2 });
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

function getTimeZone() {
  return process.env.BOOKING_TIMEZONE || "America/New_York";
}

function getSlotDurationMinutes() {
  const n = parseInt(process.env.BOOKING_SLOT_DURATION_MINUTES || "90", 10);
  return Number.isFinite(n) && n > 0 ? n : 90;
}

function intervalsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

function busyIntervalsFromFreeBusy(apiResponse, calendarId) {
  const data = apiResponse?.data ?? apiResponse;
  const cal = data?.calendars?.[calendarId];
  if (!cal || cal.errors?.length) return [];
  const busy = cal.busy || [];
  return busy.map((b) => ({
    start: new Date(b.start).getTime(),
    end: new Date(b.end).getTime(),
  }));
}

async function fetchBusyIntervalsForDay(dateStr) {
  const zone = getTimeZone();
  const parts = parseDateParts(dateStr);
  if (!parts) throw new Error("Invalid date format; use YYYY-MM-DD");

  const dayStart = DateTime.fromObject(
    {
      year: parts.y,
      month: parts.mo,
      day: parts.d,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    { zone }
  );
  const dayEnd = dayStart.plus({ days: 1 });

  const calendar = await getCalendarApi();
  const calendarId = getCalendarId();

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISO(),
      timeMax: dayEnd.toISO(),
      items: [{ id: calendarId }],
    },
  });

  return busyIntervalsFromFreeBusy(res, calendarId);
}

function slotWindowMillis(dateStr, time12h, zone, durationMin) {
  const parts = parseDateParts(dateStr);
  const tp = parse12h(time12h);
  if (!parts || !tp) return null;

  const start = DateTime.fromObject(
    {
      year: parts.y,
      month: parts.mo,
      day: parts.d,
      hour: tp.h,
      minute: tp.min,
      second: 0,
      millisecond: 0,
    },
    { zone }
  );
  const end = start.plus({ minutes: durationMin });
  return { startMs: start.toMillis(), endMs: end.toMillis(), start, end };
}

function weekdayInZone(parts) {
  return DateTime.fromObject(
    { year: parts.y, month: parts.mo, day: parts.d },
    { zone: getTimeZone() }
  ).weekday;
}

async function getAvailabilitySlots(dateStr) {
  const zone = getTimeZone();
  const parts = parseDateParts(dateStr);
  if (!parts) {
    const err = new Error("Invalid date format");
    err.code = "BAD_DATE";
    throw err;
  }

  // Luxon: Monday=1 … Sunday=7
  if (weekdayInZone(parts) === 7) {
    return BASE_SLOT_TIMES.map((time) => ({
      time,
      status: "off",
      label: "Closed",
    }));
  }

  const durationMin = getSlotDurationMinutes();
  const busy = await fetchBusyIntervalsForDay(dateStr);
  const saturday = weekdayInZone(parts) === 6;

  return BASE_SLOT_TIMES.map((time, index) => {
    if (saturday && index >= 4) {
      return { time, status: "off", label: "Not Offered" };
    }

    const win = slotWindowMillis(dateStr, time, zone, durationMin);
    if (!win) {
      return { time, status: "off", label: "Not Offered" };
    }

    const overlaps = busy.some((b) =>
      intervalsOverlap(win.startMs, win.endMs, b.start, b.end)
    );

    if (overlaps) {
      return { time, status: "busy", label: "Occupied" };
    }

    return { time, status: "available", label: "Available" };
  });
}

async function assertSlotStillFree(dateStr, time12h) {
  const zone = getTimeZone();
  const durationMin = getSlotDurationMinutes();
  const win = slotWindowMillis(dateStr, time12h, zone, durationMin);
  if (!win) {
    const err = new Error("Invalid date or time");
    err.code = "BAD_SLOT";
    throw err;
  }

  const busy = await fetchBusyIntervalsForDay(dateStr);
  const blocked = busy.some((b) =>
    intervalsOverlap(win.startMs, win.endMs, b.start, b.end)
  );

  if (blocked) {
    const err = new Error("Time slot is no longer available");
    err.code = "SLOT_TAKEN";
    throw err;
  }

  return win;
}

async function insertBookingEvent({
  dateStr,
  time12h,
  summary,
  description,
  attendeeEmail,
}) {
  const zone = getTimeZone();
  const win = await assertSlotStillFree(dateStr, time12h);

  const calendar = await getCalendarApi();
  const calendarId = getCalendarId();

  const event = {
    summary: summary || "Appointment",
    description: description || "",
    start: {
      dateTime: win.start.toFormat("yyyy-LL-dd'T'HH:mm:ss"),
      timeZone: zone,
    },
    end: {
      dateTime: win.end.toFormat("yyyy-LL-dd'T'HH:mm:ss"),
      timeZone: zone,
    },
  };

  if (attendeeEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeEmail)) {
    event.attendees = [{ email: attendeeEmail }];
  }

  const res = await calendar.events.insert({
    calendarId,
    requestBody: event,
    sendUpdates: attendeeEmail ? "all" : "none",
  });

  return { eventId: res.data.id, htmlLink: res.data.htmlLink };
}

function generateAuthUrl() {
  const oauth2 = getOAuth2Client();
  if (!oauth2) return null;
  return oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    include_granted_scopes: true,
  });
}

async function getTokensFromCode(code) {
  const oauth2 = getOAuth2Client();
  if (!oauth2) throw new Error("OAuth not configured");
  try {
    const { tokens } = await oauth2.getToken(code);
    return tokens;
  } catch (err) {
    const desc =
      err?.response?.data?.error_description ||
      err?.response?.data?.error ||
      err?.message;
    const wrapped = new Error(desc || "Token exchange failed");
    wrapped.cause = err;
    throw wrapped;
  }
}

module.exports = {
  SCOPES,
  BASE_SLOT_TIMES,
  calendarFullyConfigured,
  oauthClientConfigured,
  getIntegrationStatus,
  getOAuth2Client,
  generateAuthUrl,
  getTokensFromCode,
  getAvailabilitySlots,
  insertBookingEvent,
  getTimeZone,
  getSlotDurationMinutes,
};
