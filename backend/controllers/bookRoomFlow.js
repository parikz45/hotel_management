const pool = require("../config/db");

const bookRoomFlow = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

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

        const bookingRes = await client.query(
            "SELECT * FROM bookings WHERE id=$1",
            [bookingId]
        );

        const booking = bookingRes.rows[0];

        // PAYMENT
        const paymentRes = await client.query(
            `INSERT INTO payments (amount, method, booking_id, user_id, status)
             VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [
                booking.amount,
                paymentMethod,
                booking.id,
                booking.user_id,
                paymentMethod === 'cash' ? 'pending' : 'completed'
            ]
        );

        // UPDATE BOOKING
        await client.query(
            "UPDATE bookings SET status='booked' WHERE id=$1",
            [booking.id]
        );

        // RESERVE ROOM
        await client.query(
            "UPDATE rooms SET is_reserved=true WHERE id=$1",
            [booking.room_id]
        );

        await client.query("COMMIT");

        res.status(200).json({
            message: "Booking confirmed",
            payment: paymentRes.rows[0]
        });

    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

module.exports = { bookRoomFlow };