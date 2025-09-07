const Payments=require("../models/Payments");

// Get all payments (admin only)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json(err);
    }
}; 