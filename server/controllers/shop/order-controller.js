const createOrder = async () => {
    try {

        const {
            userId,
            cartItems,
            adderssInfo,
            orderId,
            paymentMethod,
            paymentStatus,
            totatAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;
        const createPaymentJSON = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency : 'PKR',
                            quantity : item.quantity
                        }))
                    },
                    amount : {
                        currency : 'PKR',
                        total : totatAmount.toFixed(2),
                    },
                    description : 'description'
                }
            ]
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        });
    }
};

const capturePayment = async () => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        });
    }
};

module.exports = {
    createOrder, capturePayment
};