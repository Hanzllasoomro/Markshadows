const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({ success: true, result });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Upload failed", error });
    }
};

const addProduct = async (req, res) => {

    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;


        const newlyCreatedProduct = new Product({
            image : image.result.url,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });
        await newlyCreatedProduct.save();
        res.status(201).json({ success: true, data: newlyCreatedProduct, message: "Product added successfully" });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Failed to add product", error });
    }
}

const fetchAllProducts = async (req, res) => {

    try {

        const listOfProducts = await Product.find();
        res.status(200).json({ success: true, data: listOfProducts, message: "Products fetched successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch products", error });
    }
}
const editProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        const findProduct = await Product.findById(id);
        if (!findProduct) return res.status(404).json({ success: false, message: "Product not found" });

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({ success: true, data: findProduct, message: "Product updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add product", error });
    }
}

const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const findProduct = await Product.findById(id);
        if (!findProduct) return res.status(404).json({ success: false, message: "Product not found" });
        await findProduct.remove();
        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add product", error });
    }
}

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
};
