const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const uploadToCloudinary = require('../components/uploadToCloudinary');

// @desc    Get all products (with filters, search, sort)
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const { category, brand, search, sort } = req.query;

  let query = {};

  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  let sortOption = {};
  if (sort === 'price-asc') sortOption.price = 1;
  else if (sort === 'price-desc') sortOption.price = -1;
  else if (sort === 'name') sortOption.title = 1;

  const products = await Product.find(query).sort(sortOption);
  res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product);
});

// @desc    Create new product
// @route   POST /api/products
// @access  Admin
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, category, brand } = req.body;

  const imageUrl = await uploadToCloudinary(req.file);

  const product = await Product.create({
    title,
    description,
    price,
    stock,
    category,
    brand,
    image: imageUrl,
  });

  res.status(201).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, category, brand } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.brand = brand || product.brand;

  // Optional image update
  if (req.file) {
    product.image = await uploadToCloudinary(req.file);
  }

  const updated = await product.save();
  res.status(200).json(updated);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({ message: 'Product deleted' });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
