const express = require('express');
const multer = require('multer');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protectRoute, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', protectRoute, isAdmin, upload.single('image'), createProduct);
router.put('/:id', protectRoute, isAdmin, upload.single('image'), updateProduct);
router.delete('/:id', protectRoute, isAdmin, deleteProduct);

module.exports = router;
