const Product = require('../../models/Product');


const getFilteredProducts = async (req, res) => {
    try {

        const categoryParam = req.query.category || "";
        const brandParam = req.query.brand || "";
        const sortBy = req.query.sortBy || "priceAsc";

        let filters = {};

        if (categoryParam.trim()) {
            filters.category = { $in: categoryParam.split(',') };
        }
        if (brandParam.trim()) {
            filters.brand = { $in: brandParam.split(',') };
        }

        let sort = {};

        switch (sortBy) {
            case 'priceAsc':
                sort.price = 1;
                break;
            case 'priceDesc':
                sort.price = -1;
                break;
            case 'atoz':
                sort.title = 1;
                break;
            case 'ztoa':
                sort.title = -1;
                break;
            case 'newest':
                sort.createdAt = -1;
                break;
            case 'oldest':
                sort.createdAt = 1;
                break;
            default:
                sort.price = 1;
        }

        const products = await Product.find(filters).sort(sort);
        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });

    }
}

const getProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    getFilteredProducts,
    getProductDetails
};