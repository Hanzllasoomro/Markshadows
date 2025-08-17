const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            salePrice: String,
            quantity: Number,
        },
    ],

    adderssInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderId: String,
    paymentMethod: String,
    paymentStatus: String,
    totatAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
});

module.exports = mongoose.model('Order', OrderSchema);