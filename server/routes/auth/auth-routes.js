const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require('../../controllers/auth/auth-controller');
const { protectRoute } = require('../../middlewares/auth-middleware');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many registrations from this IP, please try again later.',
});

const validateRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerLimiter, validateRegister, registerUser);
router.post('/login', registerLimiter, validateLogin, loginUser);
router.post('/logout', protectRoute, logoutUser);
router.get('/profile', protectRoute, getUserProfile);

module.exports = router;
