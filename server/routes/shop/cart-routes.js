const express = require("express");
const { addToCart, fetchCartItems, updateCartItemsQty, deleteCartItem } = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems);
router.put('/update-cart', updateCartItemsQty);
router.delete('/:userId/:porductId', deleteCartItem);


module.exports = router;