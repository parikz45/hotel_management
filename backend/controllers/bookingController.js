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