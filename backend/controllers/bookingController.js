const Booking = require('../models/Bookings');

// Create a new booking
exports.createBooking = async (req, res) => {
    console.log("Incoming booking body:", req.body);
    const newBooking = new Booking(req.body);   
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Get all bookings of a specific user
exports.getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('room');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a booking by ID 
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};