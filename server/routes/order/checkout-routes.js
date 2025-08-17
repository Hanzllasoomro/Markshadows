const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = express.Router();

// Create Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId, cartItems, addressInfo } = req.body;

    if (!cartItems || cartItems.items.length === 0) {
      return res.status(400).json({ error: "No products found in request." });
    }

    const lineItems = cartItems.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || "Unnamed Product",
          images: item.image ? [item.image] : [],
        },
        unit_amount:
          (item.salePrice > 0 ? item.salePrice : item.price) * 100, // cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: req.body.email, // optional
      metadata: {
        userId,
        addressInfo: JSON.stringify(addressInfo),
        cartItems: JSON.stringify(cartItems.items),
      },
      success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
