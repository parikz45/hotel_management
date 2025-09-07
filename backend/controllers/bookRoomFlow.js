const Booking = require('../models/Bookings');
const Payment = require('../models/Payments');
const Room = require('../models/Rooms');

const bookRoomFlow = async (req, res) => {
    try {
        const { bookingId, paymentMethod } = req.body;

        // Find the existing booking
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        // Create payment record
        const payment = await Payment.create({
            user: booking.user,
            amount: booking.amount,
            booking: booking._id,
            method: paymentMethod,
            status: paymentMethod === 'cash' ? 'pending' : 'completed'
        });

        // Update booking status
        booking.status = 'booked';
        await booking.save();

        // Reserve room
        const room = await Room.findById(booking.room);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        room.isReserved = true;
        await room.save();

        res.status(200).json({
            message: 'Booking confirmed!',
            booking,
            payment,
            room
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { bookRoomFlow };
