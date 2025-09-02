const Booking = require('../models/Bookings');
const Payment = require('../models/Payments');
const Room = require('../models/Rooms');

const bookRoomFlow = async (req, res) => {
    try {
        const { userId, roomId, checkinDate, checkoutDate, paymentMethod, amount } = req.body;

        // Create payment
        const payment = await Payment.create({
            user: userId,
            amount,
            method: paymentMethod,
            status: 'completed' 
        });

        if (payment.status !== 'completed') {
            return res.status(400).json({ error: 'Payment failed, cannot proceed with booking.' });
        }

        // Create booking
        const booking = await Booking.create({
            user: userId,
            checkinDate,
            checkoutDate,
            status: 'booked'
        });

        // Reserve room
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        room.isReserved = true;
        await room.save();

        res.status(200).json({
            message: 'Payment completed, booking confirmed, room reserved!',
            payment,
            booking,
            room
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { bookRoomFlow };
