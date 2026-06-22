const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { amountCents } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};