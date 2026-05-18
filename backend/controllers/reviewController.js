const pool = require("../config/db");

// Create a new review
const createReview = async (req, res) => {
    try {
        const { rating, comment, room, user } = req.body;

        const result = await pool.query(
            `INSERT INTO reviews (rating, comment, room_id, user_id)
             VALUES ($1,$2,$3,$4)
             RETURNING *`,
            [rating, comment, room, user]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Get all reviews for a specific room
const getReviewsByRoom = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM reviews WHERE room_id = $1",
            [req.params.roomId]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = { createReview, getReviewsByRoom };