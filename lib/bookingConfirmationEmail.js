"use strict";

function normalizeEnv(raw) {
  if (raw == null || raw === "") return "";
  return String(raw).trim().replace(/^['"]|['"]$/g, "");
}

function isEmailConfigured() {
  return !!(
    normalizeEnv(process.env.RESEND_API_KEY) &&
    normalizeEnv(process.env.BOOKING_EMAIL_FROM)
  );
}

function buildPlainTextSummary(data) {
  const lines = [
    "Appointment Confirmed",
    "",
    `Service: ${data.service || "—"}`,
    `Booking Price: ${data.bookingPrice || "—"}`,
    `Date: ${data.appointmentDate || "—"}`,
    `Time: ${data.appointmentTime || "—"}`,
    "",
    `Name: ${data.customerName || "—"}`,
    `Email: ${data.customerEmail || "—"}`,
    `Phone: ${data.customerPhone || "—"}`,
    `Address: ${data.addressLine || "—"}`,
    `City, State, ZIP: ${data.cityStateZip || "—"}`,
    `Country: ${data.country || "—"}`,
    "",
    `Booking ID: ${data.bookingId || "—"}`,
    data.businessName ? `\n${data.businessName}` : "",
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtmlSummary(data) {
  const row = (label, value) =>
    `<tr><td style="padding:8px 12px;color:#64748b;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;font-size:14px;font-weight:600;color:#0f172a;">${escapeHtml(value)}</td></tr>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;margin:0;padding:24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
    <tr><td style="background:#0f1b46;color:#fff;padding:20px 24px;">
      <h1 style="margin:0;font-size:22px;">Appointment confirmed</h1>
      <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">${escapeHtml(data.businessName || "Your service provider")}</p>
    </td></tr>
    <tr><td style="padding:8px 0 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Service", data.service)}
        ${row("Booking price", data.bookingPrice)}
        ${row("Date", data.appointmentDate)}
        ${row("Time", data.appointmentTime)}
        ${row("Name", data.customerName)}
        ${row("Email", data.customerEmail)}
        ${row("Phone", data.customerPhone)}
        ${row("Address", data.addressLine)}
        ${row("City, State, ZIP", data.cityStateZip)}
        ${row("Country", data.country)}
        ${row("Booking ID", data.bookingId)}
      </table>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#f1f5f9;font-size:13px;color:#64748b;">
      If you need to change your appointment, use the reschedule option on your confirmation page or contact us.
    </td></tr>
  </table>
</body>
</html>`;
}

function normalizeBookingPayload(body) {
  const b = body || {};
  const addressLine =
    b.addressLine ||
    b.property_address ||
    b.billing_address ||
    "";
  const city = b.city || b.billing_city || "";
  const st = b.state || b.billing_state || "";
  const zip = b.zip_code || b.billing_zip || b.zip || "";
  const cityStateZip =
    b.cityStateZip ||
    [city, st, zip].filter(Boolean).join(", ").replace(/,\s*,/g, ",");

  return {
    businessName: b.business_name || b.businessName || "Tamay Enterprises",
    service: b.service_type || b.serviceSummary || b.service || "",
    bookingPrice: b.booking_price || b.bookingPrice || "",
    appointmentDate:
      b.appointment_date ||
      b.appointmentDate ||
      (b.date && b.time ? `${b.date} at ${b.time}` : b.date) ||
      "",
    appointmentTime: b.appointment_time || b.appointmentTime || b.time || "",
    customerName: b.customer_name || b.customerName || "",
    customerEmail: (b.customer_email || b.customerEmail || "").trim(),
    customerPhone: b.customer_phone || b.customerPhone || "",
    addressLine,
    cityStateZip,
    country: b.country || "United States",
    bookingId: b.booking_id || b.bookingId || "",
  };
}

async function sendBookingConfirmationEmail(body) {
  const data = normalizeBookingPayload(body);
  const to = data.customerEmail;

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    const err = new Error("Valid customer email is required");
    err.code = "BAD_EMAIL";
    throw err;
  }

  if (!isEmailConfigured()) {
    const err = new Error("Confirmation email is not configured on the server");
    err.code = "EMAIL_DISABLED";
    throw err;
  }

  const apiKey = normalizeEnv(process.env.RESEND_API_KEY);
  const from = normalizeEnv(process.env.BOOKING_EMAIL_FROM);
  const subject =
    normalizeEnv(process.env.BOOKING_EMAIL_SUBJECT) ||
    `Appointment confirmed — ${data.bookingId || data.service || "Booking"}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: buildHtmlSummary(data),
      text: buildPlainTextSummary(data),
    }),
  });

  let json = {};
  try {
    json = await res.json();
  } catch (e) {
    json = {};
  }

  if (!res.ok) {
    const msg = json.message || json.error || `Resend HTTP ${res.status}`;
    const err = new Error(msg);
    err.code = "SEND_FAILED";
    throw err;
  }

  return { ok: true, id: json.id };
}

module.exports = {
  isEmailConfigured,
  buildPlainTextSummary,
  buildHtmlSummary,
  normalizeBookingPayload,
  sendBookingConfirmationEmail,
};
