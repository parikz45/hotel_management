const Payments=require("../models/Payments");

// Create a new payment
exports.createPayment = async (req, res) => {
    const newPayment = new Payments(req.body);   
    try {
        const savedPayment = await newPayment.save();
        res.status(200).json(savedPayment);
    } catch (err) {
        res.status(500).json(err);
    }
};
// Get all payments of a specific user
exports.getPaymentsByUser = async (req, res) => {
    try {
        const payments = await Payments.find({ user: req.params.userId });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json(err);
    }
};
// Get all payments (admin only)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json(err);
    }
}; 