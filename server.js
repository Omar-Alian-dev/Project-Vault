require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Stripe webhook must receive raw body — registered before express.json
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;
      await Upload.findOneAndUpdate(
        { paymentIntentId: pi.id },
        { paymentStatus: "succeeded" },
      ).catch(console.error);
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      await Upload.findOneAndUpdate(
        { paymentIntentId: pi.id },
        { paymentStatus: "failed" },
      ).catch(console.error);
    }

    res.json({ received: true });
  },
);

app.use(express.json());

// MongoDB
const uploadSchema = new mongoose.Schema({
  paymentIntentId: { type: String, unique: true },
  paymentStatus: { type: String, default: "pending" },
  amountCents: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now },
});
const Upload = mongoose.model("Upload", uploadSchema);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI).catch(console.error);
}

// Helpers
function getIrys() {
  if (!process.env.ARWEAVE_KEY) throw new Error("ARWEAVE_KEY not set");
  const Irys = require("@irys/sdk");
  return new Irys({
    url: "https://node2.irys.xyz",
    token: "arweave",
    key: JSON.parse(process.env.ARWEAVE_KEY),
  });
}

function verifyUploadToken(req, res) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing upload token." });
    return null;
  }
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ error: "Invalid or expired upload token." });
    return null;
  }
}

// Create PaymentIntent and log it
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amountCents } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
    });

    if (process.env.MONGO_URI) {
      await Upload.create({
        paymentIntentId: paymentIntent.id,
        amountCents,
        paymentMethod: "credit_card",
      }).catch(console.error);
    }

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment with Stripe and issue a short-lived upload JWT
app.post("/api/authorize-upload", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      return res.status(400).json({ error: "Missing paymentIntentId." });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== "succeeded") {
      return res.status(402).json({ error: "Payment not confirmed." });
    }

    if (process.env.MONGO_URI) {
      await Upload.findOneAndUpdate(
        { paymentIntentId },
        { paymentStatus: "succeeded" },
      ).catch(console.error);
    }

    const uploadToken = jwt.sign(
      { paymentIntentId, authorized: true },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    res.json({ uploadToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload encrypted file bytes to Arweave — server-funded for credit-card users
// Data is already AES-256-GCM encrypted by the browser, server never sees plaintext
app.post(
  "/api/upload-to-arweave",
  express.raw({ type: "application/octet-stream", limit: "200mb" }),
  async (req, res) => {
    const payload = verifyUploadToken(req, res);
    if (!payload) return;

    try {
      const irys = getIrys();
      const contentType =
        req.headers["x-content-type"] || "application/octet-stream";

      const receipt = await irys.upload(req.body, {
        tags: [
          { name: "Content-Type", value: contentType },
          { name: "App-Name", value: "Project-Vault" },
          { name: "App-Version", value: "3" },
        ],
      });

      res.json({ txId: receipt.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// Upload vault index JSON to Arweave — server-funded for credit-card users
app.post("/api/upload-vault-index", async (req, res) => {
  const payload = verifyUploadToken(req, res);
  if (!payload) return;

  try {
    const { vaultIndex } = req.body;
    const irys = getIrys();

    const receipt = await irys.upload(JSON.stringify(vaultIndex), {
      tags: [
        { name: "Content-Type", value: "application/json" },
        { name: "App-Name", value: "Project-Vault" },
        { name: "Type", value: "vault-index" },
        { name: "App-Version", value: "3" },
      ],
    });

    res.json({ txId: receipt.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
