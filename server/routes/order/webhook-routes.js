const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Order = require("../models/order-model"); // adjust path

// Stripe webhook (must use raw body)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET // from Stripe dashboard
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.sendStatus(400);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        // Build Order from session metadata
        const order = new Order({
          userId: session.metadata.userId,
          cartItems: JSON.parse(session.metadata.cartItems),
          adderssInfo: JSON.parse(session.metadata.addressInfo),
          orderId: session.id,
          paymentMethod: "Stripe",
          paymentStatus: session.payment_status,
          totatAmount: session.amount_total / 100,
          orderDate: new Date(),
          orderUpdateDate: new Date(),
          paymentId: session.payment_intent,
        });

        await order.save();
        console.log("✅ Order saved to DB:", order._id);
      } catch (error) {
        console.error("Error saving order:", error.message);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
