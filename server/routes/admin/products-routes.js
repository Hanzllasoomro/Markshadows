const express = require("express");
const {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
} = require("../../controllers/admin/products-controller");

const {upload} = require("../../helpers/cloudinary");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add-product", addProduct);
router.get("/fetch-products", fetchAllProducts);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;