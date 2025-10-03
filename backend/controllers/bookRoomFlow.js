const Booking = require('../models/Bookings');
const Payment = require('../models/Payments');
const Room = require('../models/Rooms');

const bookRoomFlow = async (req, res) => {
    try {
        const { bookingId, paymentMethod } = req.body;
        console.log("Request body:", req.body);

        const booking = await Booking.findById(bookingId).populate("user").populate("room");
        console.log("Booking fetched:", booking);

        if (!booking) {
            console.log("Booking not found for id:", bookingId);
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (!booking.user) {
            console.log("Booking has no associated user!");
            return res.status(400).json({ error: 'Booking has no associated user' });
        }

        if (!booking.room) {
            console.log("Booking has no associated room!");
            return res.status(400).json({ error: 'Booking has no associated room' });
        }

        console.log("Booking found:", booking);
        console.log("Booking.user:", booking.user);
        console.log("Booking.room:", booking.room);


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
        console.error("Error in bookRoomFlow:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { bookRoomFlow };
