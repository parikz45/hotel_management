const pool = require("../config/db");

// CREATE
exports.createBooking = async (req, res) => {
    const { checkinDate, checkoutDate, room, user, amount } = req.body;

    const result = await pool.query(
        `INSERT INTO bookings
        (checkin_date, checkout_date, room_id, user_id, amount)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [checkinDate, checkoutDate, room, user, amount]
    );

    res.status(200).json(result.rows[0]);
};

// GET USER BOOKINGS (WITH ROOM DETAILS)
exports.getBookingsByUser = async (req, res) => {
    const result = await pool.query(
        `SELECT b.*, r.*
         FROM bookings b
         JOIN rooms r ON b.room_id = r.id
         WHERE b.user_id = $1`,
        [req.params.userId]
    );

    res.status(200).json(result.rows);
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT b.*, r.*, u.username
             FROM bookings b
             JOIN rooms r ON b.room_id = r.id
             JOIN users u ON b.user_id = u.id
             WHERE b.id = $1`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET ALL (ADMIN)
exports.getAllBookings = async (req, res) => {
    const result = await pool.query(
        `SELECT b.*, r.*, u.username
         FROM bookings b
         JOIN rooms r ON b.room_id = r.id
         JOIN users u ON b.user_id = u.id`
    );

    res.status(200).json(result.rows);
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM bookings WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json("Booking has been deleted...");

    } catch (err) {
        res.status(500).json(err.message);
    }
};