require("dotenv").config();  // ← must be FIRST

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amountCents } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));