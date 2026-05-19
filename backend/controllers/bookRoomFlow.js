const pool = require("../config/db");

const bookRoomFlow = async (req, res) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const {
            bookingId,
            paymentMethod
        } = req.body;

        // GET BOOKING
        const bookingRes = await client.query(
            "SELECT * FROM bookings WHERE id=$1",
            [bookingId]
        );

        if (bookingRes.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Booking not found"
            });
        }

        const booking = bookingRes.rows[0];

        // CREATE PAYMENT
        const paymentRes = await client.query(
            `INSERT INTO payments
            (amount, method, booking_id, user_id, status)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,
            [
                booking.amount,
                paymentMethod,
                booking.id,
                booking.user_id,
                paymentMethod === "cash"
                    ? "pending"
                    : "completed"
            ]
        );

        // UPDATE BOOKING STATUS
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
            message: "Booking confirmed!",
            payment: paymentRes.rows[0]
        });

    } catch (err) {

        await client.query("ROLLBACK");

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    } finally {

        client.release();
    }
};

module.exports = {
    bookRoomFlow
};