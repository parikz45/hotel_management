const mongoose = require("mongoose");
const Payments = require("../models/Payments");
const Booking = require("../models/Bookings");

// Get all payments (admin only)
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.find();
        res.status(200).json(payments);
    } catch (err) {
        console.error("Error in getAllPayments:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get a payment by booking id
const getPaymentByBookingId = async (req, res) => {
    try {
        const { bookingid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookingid)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        let payment = await Payments.findOne({ booking: bookingid })
            .populate("booking")
            .populate("user");

        const booking = await Booking.findById(bookingid)
            .populate("user")
            .populate("room");

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const receipt = {
            receiptId: booking._id,
            bookingId: booking._id,
            user: {
                id: booking.user?._id,
                name: booking.user?.username || booking.user?.name,
                email: booking.user?.email
            },
            roomId: booking.room?._id,
            amount: booking.amount,
            method: payment?.method || "pending",
            status: payment?.status || "pending",
            paymentDate: payment?.paymentDate || null,
            bookingStatus: booking.status,
            checkinDate: booking.checkinDate,
            checkoutDate: booking.checkoutDate
        };

        res.status(200).json(receipt);
    } catch (err) {
        console.error("Error in getPaymentByBookingId:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllPayments,
    getPaymentByBookingId
};