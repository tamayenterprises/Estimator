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

function weekdayInZone(parts) {
  return DateTime.fromObject(
    { year: parts.y, month: parts.mo, day: parts.d },
    { zone: getTimeZone() }
  ).weekday;
}

/** Monday–Friday and Saturday end hour (Luxon weekday: Mon=1 … Sun=7) */
function getWorkingBoundsMillis(parts, zone) {
  const wd = weekdayInZone(parts);
  if (wd === 7) return null;

  let endHour = 17;
  let endMinute = 0;
  if (wd === 6) {
    endHour = 13;
    endMinute = 0;
  }

  const start = DateTime.fromObject(
    {
      year: parts.y,
      month: parts.mo,
      day: parts.d,
      hour: 9,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    { zone }
  );
  const end = DateTime.fromObject(
    {
      year: parts.y,
      month: parts.mo,
      day: parts.d,
      hour: endHour,
      minute: endMinute,
      second: 0,
      millisecond: 0,
    },
    { zone }
  );

  return { startMs: start.toMillis(), endMs: end.toMillis() };
}

function mergeBusyIntervals(intervals) {
  if (!intervals.length) return [];
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const out = [{ start: sorted[0].start, end: sorted[0].end }];
  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    const last = out[out.length - 1];
    if (cur.start <= last.end) {
      last.end = Math.max(last.end, cur.end);
    } else {
      out.push({ start: cur.start, end: cur.end });
    }
  }
  return out;
}

function clipBusyToWindow(busy, winStart, winEnd) {
  const clipped = [];
  for (const b of busy) {
    const s = Math.max(b.start, winStart);
    const e = Math.min(b.end, winEnd);
    if (s < e) clipped.push({ start: s, end: e });
  }
  return mergeBusyIntervals(clipped);
}

function formatTime12hFromMillis(ms, zone) {
  return DateTime.fromMillis(ms, { zone }).toFormat("h:mm a");
}

function generateSlotsFromAvailability(parts, zone, busyRaw, durationMin, stepMin) {
  const bounds = getWorkingBoundsMillis(parts, zone);
  if (!bounds) return [];

  const { startMs: workStart, endMs: workEnd } = bounds;
  const slotLenMs = durationMin * 60 * 1000;
  const stepMs = stepMin * 60 * 1000;

  const busy = clipBusyToWindow(mergeBusyIntervals(busyRaw), workStart, workEnd);

  const slots = [];
  let cursor = workStart;

  for (const b of busy) {
    let t = cursor;
    const gapEnd = Math.min(b.start, workEnd);
    while (t + slotLenMs <= gapEnd) {
      slots.push({
        time: formatTime12hFromMillis(t, zone),
        status: "available",
        label: "Available",
      });
      t += stepMs;
    }
    cursor = Math.max(cursor, b.end);
  }

  let t = cursor;
  while (t + slotLenMs <= workEnd) {
    slots.push({
      time: formatTime12hFromMillis(t, zone),
      status: "available",
      label: "Available",
    });
    t += stepMs;
  }

  return slots;
}

function subtractIntervalFromBusy(busyMerged, subStart, subEnd) {
  const result = [];
  for (const b of busyMerged) {
    if (b.end <= subStart || b.start >= subEnd) {
      result.push({ ...b });
      continue;
    }
    if (b.start < subStart) {
      result.push({ start: b.start, end: Math.min(b.end, subStart) });
    }
    if (b.end > subEnd) {
      result.push({ start: Math.max(b.start, subEnd), end: b.end });
    }
  }
  return mergeBusyIntervals(result.filter((x) => x.start < x.end));
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
    slotStepMinutes: getSlotStepMinutes(),
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

function getSlotStepMinutes() {
  const n = parseInt(process.env.BOOKING_SLOT_STEP_MINUTES || "30", 10);
  return Number.isFinite(n) && n > 0 ? n : 30;
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

async function getEventWindowMillis(eventId) {
  const calendar = await getCalendarApi();
  const calendarId = getCalendarId();
  const res = await calendar.events.get({
    calendarId,
    eventId,
  });
  const d = res.data;
  if (d.start.date) {
    const zone = getTimeZone();
    const start = DateTime.fromISO(d.start.date, { zone }).startOf("day");
    const end = start.plus({ days: 1 });
    return { startMs: start.toMillis(), endMs: end.toMillis() };
  }
  const startMs = new Date(d.start.dateTime).getTime();
  const endMs = new Date(d.end.dateTime).getTime();
  return { startMs, endMs };
}

async function assertSlotStillFree(dateStr, time12h, excludeEventId) {
  const zone = getTimeZone();
  const durationMin = getSlotDurationMinutes();
  const parts = parseDateParts(dateStr);
  const win = slotWindowMillis(dateStr, time12h, zone, durationMin);
  if (!win || !parts) {
    const err = new Error("Invalid date or time");
    err.code = "BAD_SLOT";
    throw err;
  }

  const bounds = getWorkingBoundsMillis(parts, zone);
  if (
    !bounds ||
    win.startMs < bounds.startMs ||
    win.endMs > bounds.endMs
  ) {
    const err = new Error("Time is outside bookable hours");
    err.code = "BAD_SLOT";
    throw err;
  }

  let busy = mergeBusyIntervals(await fetchBusyIntervalsForDay(dateStr));

  if (excludeEventId) {
    try {
      const oldWin = await getEventWindowMillis(excludeEventId);
      busy = subtractIntervalFromBusy(busy, oldWin.startMs, oldWin.endMs);
    } catch (e) {
      const err = new Error("Could not load existing calendar event");
      err.code = "EVENT_NOT_FOUND";
      throw err;
    }
  }

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

async function getAvailabilitySlots(dateStr) {
  const zone = getTimeZone();
  const parts = parseDateParts(dateStr);
  if (!parts) {
    const err = new Error("Invalid date format");
    err.code = "BAD_DATE";
    throw err;
  }

  if (weekdayInZone(parts) === 7) {
    return [];
  }

  const durationMin = getSlotDurationMinutes();
  const stepMin = getSlotStepMinutes();
  const busy = await fetchBusyIntervalsForDay(dateStr);

  return generateSlotsFromAvailability(parts, zone, busy, durationMin, stepMin);
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

async function rescheduleBookingEvent({
  eventId,
  dateStr,
  time12h,
  summary,
  description,
  attendeeEmail,
}) {
  const zone = getTimeZone();
  const win = await assertSlotStillFree(dateStr, time12h, eventId);

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

  const res = await calendar.events.update({
    calendarId,
    eventId,
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
  calendarFullyConfigured,
  oauthClientConfigured,
  getIntegrationStatus,
  getOAuth2Client,
  generateAuthUrl,
  getTokensFromCode,
  getAvailabilitySlots,
  insertBookingEvent,
  rescheduleBookingEvent,
  getTimeZone,
  getSlotDurationMinutes,
  getSlotStepMinutes,
};
