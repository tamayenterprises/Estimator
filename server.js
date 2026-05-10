// ============================================================================
// STRIPE PAYMENT BACKEND - Node.js/Express
// ============================================================================
// This server handles creating Stripe Payment Intents for the Cost Estimator
// Deploy this to production with your Stripe keys
//
// INSTALLATION:
// 1. npm init -y
// 2. npm install express stripe dotenv cors body-parser
// 3. Create .env file with STRIPE_SECRET_KEY and PORT
// 4. npm start
//
// ENVIRONMENT VARIABLES NEEDED:
// STRIPE_SECRET_KEY=sk_live_your_key_here (or sk_test_ for testing)
// PORT=3001 (or your preferred port)
// CORS_ORIGIN=https://yourdomainname.com (the estimator domain)

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

function normalizeStripeKey(rawKey) {
  if (!rawKey) return "";
  // Guard against accidental copy/paste artifacts in host env vars.
  // Some dashboards can add quotes or hidden/newline whitespace when pasting keys.
  return rawKey
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\s+/g, "");
}

const stripeSecretKey = normalizeStripeKey(process.env.STRIPE_SECRET_KEY);
const rawStripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripePublicKey = normalizeStripeKey(process.env.STRIPE_PUBLIC_KEY);

// Stripe setup - make sure environment variable is set
if (!stripeSecretKey) {
  console.error("ERROR: STRIPE_SECRET_KEY environment variable not set");
  process.exit(1);
}

if (!stripeSecretKey.startsWith("sk_test_") && !stripeSecretKey.startsWith("sk_live_")) {
  console.error("ERROR: STRIPE_SECRET_KEY must start with sk_test_ or sk_live_");
  process.exit(1);
}

if (!stripePublicKey) {
  console.warn("WARN: STRIPE_PUBLIC_KEY environment variable not set");
} else if (!stripePublicKey.startsWith("pk_test_") && !stripePublicKey.startsWith("pk_live_")) {
  console.warn("WARN: STRIPE_PUBLIC_KEY should start with pk_test_ or pk_live_");
}

const stripe = Stripe(stripeSecretKey, {
  // Keep retries/timeout, but rely on Stripe SDK default HTTP client.
  // A custom fetch client can fail in some hosted Node environments.
  maxNetworkRetries: 3,
  timeout: 20000,
});

// Middleware
// Allow multiple CORS origins for development and production
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://estimator.tamayenterprises.com",
  "https://estimator-sqzv.onrender.com",
  "https://tamayenterprises.github.io/Estimator",
  process.env.CORS_ORIGIN
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS rejected origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Stripe webhooks require the raw body for signature verification — must run before express.json()
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    if (!endpointSecret) {
      console.warn("Webhook signature verification skipped - STRIPE_WEBHOOK_SECRET not set");
      event = JSON.parse(req.body.toString());
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.sendStatus(400);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      handlePaymentIntentSucceeded(event.data.object);
      break;
    case "payment_intent.payment_failed":
      handlePaymentIntentFailed(event.data.object);
      break;
    case "charge.refunded":
      handleChargeRefunded(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Google Calendar (optional; does not affect Stripe routes above) ---
const calendarLib = require("./lib/googleCalendar");

app.get("/api/calendar/status", (req, res) => {
  res.json({
    enabled: calendarLib.calendarFullyConfigured(),
    timeZone: calendarLib.getTimeZone(),
    slotDurationMinutes: calendarLib.getSlotDurationMinutes(),
  });
});

app.get("/api/calendar/availability", async (req, res) => {
  const date = req.query.date;
  if (!date || typeof date !== "string") {
    return res.status(400).json({ error: "Missing date query (YYYY-MM-DD)" });
  }
  if (!calendarLib.calendarFullyConfigured()) {
    return res.status(503).json({
      error: "Google Calendar is not connected yet",
      code: "calendar_disabled",
    });
  }
  try {
    const slots = await calendarLib.getAvailabilitySlots(date);
    res.json({
      date,
      slots,
      timeZone: calendarLib.getTimeZone(),
    });
  } catch (err) {
    console.error("calendar availability error:", err.message);
    res.status(500).json({ error: "Failed to load availability" });
  }
});

app.post("/api/calendar/bookings", async (req, res) => {
  if (!calendarLib.calendarFullyConfigured()) {
    return res.status(503).json({
      error: "Google Calendar is not connected yet",
      code: "calendar_disabled",
    });
  }

  const body = req.body || {};
  const dateStr = body.date;
  const timeStr = body.time;
  if (!dateStr || !timeStr) {
    return res.status(400).json({ error: "date and time are required" });
  }

  const summaryBase = body.serviceSummary || body.service || "Scheduled appointment";
  const customerName = body.customerName || "";
  const customerEmail = body.customerEmail || "";
  const customerPhone = body.customerPhone || "";
  const paymentIntentId = body.paymentIntentId || "";
  const bookingId = body.bookingId || "";

  const description = [
    bookingId && `Booking ID: ${bookingId}`,
    customerName && `Customer: ${customerName}`,
    customerEmail && `Email: ${customerEmail}`,
    customerPhone && `Phone: ${customerPhone}`,
    paymentIntentId && `Stripe payment: ${paymentIntentId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const summary = customerName
    ? `${summaryBase} — ${customerName}`
    : summaryBase;

  try {
    const result = await calendarLib.insertBookingEvent({
      dateStr,
      time12h: timeStr,
      summary,
      description,
      attendeeEmail: customerEmail,
    });
    res.json({
      ok: true,
      eventId: result.eventId,
      htmlLink: result.htmlLink,
    });
  } catch (err) {
    if (err.code === "SLOT_TAKEN") {
      return res.status(409).json({ error: err.message, code: "slot_taken" });
    }
    if (err.code === "BAD_SLOT") {
      return res.status(400).json({ error: err.message });
    }
    console.error("calendar booking error:", err.message);
    res.status(500).json({ error: "Failed to create calendar event" });
  }
});

app.get("/oauth/google/start", (req, res) => {
  const url = calendarLib.generateAuthUrl();
  if (!url) {
    return res
      .status(503)
      .send(
        "Google OAuth is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI."
      );
  }
  res.redirect(302, url);
});

app.get("/oauth/google/callback", async (req, res) => {
  const code = req.query.code;
  const errQ = req.query.error;
  if (errQ) {
    return res.status(400).send(`Google OAuth error: ${errQ}`);
  }
  if (!code) {
    return res.status(400).send("Missing authorization code");
  }
  try {
    const tokens = await calendarLib.getTokensFromCode(code);
    const refresh = tokens.refresh_token;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Google Calendar connected</title></head><body style="font-family:sans-serif;max-width:640px;margin:40px auto;padding:20px;">
<h1>Google Calendar OAuth complete</h1>
<p>Add this value to your host as <strong>GOOGLE_REFRESH_TOKEN</strong>, then restart or redeploy.</p>
${
  refresh
    ? `<pre style="background:#f4f4f4;padding:12px;word-break:break-all;">${refresh}</pre>`
    : "<p><strong>No refresh token returned.</strong> Revoke this app under Google Account &gt; Security and run the flow again.</p>"
}
<p style="color:#666;font-size:14px;">Optional: set <code>GOOGLE_CALENDAR_ID</code> (default <code>primary</code>) and <code>BOOKING_TIMEZONE</code>, <code>BOOKING_SLOT_DURATION_MINUTES</code>.</p>
</body></html>`;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  } catch (e) {
    console.error("OAuth callback error:", e.message);
    res.status(500).send("Failed to exchange OAuth code");
  }
});

// Serve static files (for development)
app.use(express.static(__dirname));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Public config endpoint for frontend runtime config (safe values only)
app.get("/api/public-config", (req, res) => {
  if (!stripePublicKey) {
    return res.status(500).json({ error: "STRIPE_PUBLIC_KEY is not configured on server" });
  }

  res.json({
    stripePublicKey,
  });
});

// Create Payment Intent endpoint
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", description, metadata } = req.body;

    // Validate request
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (amount > 99999900) {  // Stripe limit: $999,999 USD
      return res.status(400).json({ error: "Amount exceeds maximum allowed" });
    }

    // Validate metadata
    if (!metadata || !metadata.customerEmail) {
      return res.status(400).json({ error: "Customer email is required in metadata" });
    }

    // Create payment intent with targeted retries for transient Stripe network failures.
    let paymentIntent;
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount),  // Amount in cents
          currency: currency.toLowerCase(),
          description: description || "Tamay Enterprises - Cost Estimator",
          metadata: {
            projectType: metadata.projectType || "unknown",
            customerEmail: metadata.customerEmail,
            customerPhone: metadata.customerPhone,
            customerName: metadata.customerName,
            timestamp: new Date().toISOString(),
          },
          // Optional: Add statement descriptor suffix (appears on customer's credit card statement)
          statement_descriptor_suffix: "TAMAY ESTIMATES",
          // Optional: Automatic tax calculation if connected
          // automatic_tax: { enabled: true },
        });
        break;
      } catch (err) {
        const isTransientStripeNetworkError = err?.type === "StripeConnectionError";
        if (!isTransientStripeNetworkError || attempt === maxAttempts) {
          throw err;
        }
        // Small linear backoff before next retry attempt.
        await new Promise(resolve => setTimeout(resolve, attempt * 500));
      }
    }

    // Return client secret for frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Error creating payment intent:", {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      errno: error?.errno,
      detail: error?.detail,
      rawType: error?.rawType,
      requestId: error?.requestId,
    });
    const status = error?.type === "StripeConnectionError" ? 503 : 500;
    res.status(status).json({
      error: error.message || "Failed to create payment intent",
      type: error.type
    });
  }
});

// Payment event handlers (used by POST /webhook above)
function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);
  // Send confirmation email or update database
  // Example:
  // await sendEmail('payment_confirmation', {
  //   email: paymentIntent.metadata.customerEmail,
  //   amount: paymentIntent.amount,
  //   projectType: paymentIntent.metadata.projectType
  // });
}

function handlePaymentIntentFailed(paymentIntent) {
  console.log("Payment failed:", paymentIntent.id);
  // Send failure notification or log for review
}

function handleChargeRefunded(charge) {
  console.log("Charge refunded:", charge.id);
  // Log refund for accounting
}

// Test payment method endpoint (for testing)
app.post("/api/test-payment", (req, res) => {
  res.json({
    testCards: {
      success: "4242 4242 4242 4242",
      requiresAuth: "4000 0027 6000 3184",
      declined: "4000 0000 0000 0002",
      amexSuccess: "3782 822463 10005",
      expired: "4000 0000 0000 0069",
    },
    expiryDate: "12/25",
    cvv: "any 3-4 digits"
  });
});

// List recent payment intents (for admin/testing)
app.get("/api/recent-payments", (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Not available in production" });
  }

  stripe.paymentIntents.list({ limit: 10 })
    .then(intents => {
      res.json({
        count: intents.data.length,
        payments: intents.data.map(pi => ({
          id: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          status: pi.status,
          created: new Date(pi.created * 1000).toISOString(),
          clientEmail: pi.metadata?.customerEmail,
        }))
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message
  });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, async () => {
  const redactedKey = `${stripeSecretKey.slice(0, 8)}...${stripeSecretKey.slice(-4)}`;
  const isLiveKey = stripeSecretKey.startsWith("sk_live_");
  const keyHadWhitespaceArtifacts = /\s/.test(rawStripeSecretKey);

  console.log(`🚀 Cost Estimator Payment Server running on port ${PORT}`);
  console.log(`🔐 Using Stripe ${isLiveKey ? "LIVE" : "TEST"} mode`);
  console.log(`📝 CORS enabled for: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`);
  console.log(`🔑 Stripe secret loaded: ${redactedKey}`);
  if (stripePublicKey) {
    const redactedPk = `${stripePublicKey.slice(0, 12)}...${stripePublicKey.slice(-6)}`;
    console.log(`🔑 Stripe publishable loaded: ${redactedPk}`);
  }
  if (keyHadWhitespaceArtifacts) {
    console.warn("⚠️ STRIPE_SECRET_KEY had whitespace/newline artifacts and was normalized.");
  }

  try {
    const account = await stripe.accounts.retrieve();
    console.log(`✅ Stripe connectivity check passed for account: ${account.id}`);
  } catch (err) {
    console.error("❌ Stripe connectivity check failed:", {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      requestId: err?.requestId,
    });
  }
});

module.exports = app;
