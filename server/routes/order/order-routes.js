const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protectRoute, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protectRoute, createOrder);
router.get('/mine', protectRoute, getUserOrders);
router.get('/:id', protectRoute, getOrderById);

router.put('/:id/status', protectRoute, isAdmin, updateOrderStatus);

module.exports = router;
