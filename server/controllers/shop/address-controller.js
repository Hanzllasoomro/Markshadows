const Address = require('../../models/Address');

const addAddress = async (req, res) => {
    try {

        const {
            userId, address, city, pincode, phone, notes
        } = req.body;

        if (!userId || !address || !city || !pincode || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data Provided'
            });
        }

        const newlyCreatedAddress = new Address({
            userId, address, phone, pincode, notes, city
        });

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
};
const fetchAddress = async (req, res) => {
    try {

        const { userId } = req.params;
        if (!userId) {
            res.status(500).json({
                success: false,
                message: 'UserId is required'
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addressList
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
};
const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        const fromData = req.body;
        if (!userId || !addressId) {
            res.status(500).json({
                success: false,
                message: 'UserId & addressId is required'
            });
        }
        const address = await Address.findOneAndUpdate({
            _id: addressId, userId
        }, fromData, { new: true });

        if (!address) {
            res.status(500).json({
                success: false,
                message: 'Address not found!!'
            });
        }

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
};
const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            res.status(500).json({
                success: false,
                message: 'UserId & addressId is required'
            });
        }
        const address = await Address.findOneAndDelete({
            _id: addressId, userId
        });

        if (!address) {
            res.status(500).json({
                success: false,
                message: 'Address not found!!'
            });
        }

        res.status(200).json({
            success: true,
            message : 'Address Deleted Successfully'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }
};

module.exports = {
    addAddress,
    fetchAddress,
    editAddress,
    deleteAddress
};