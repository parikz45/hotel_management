const pool = require("../config/db");

// CREATE
const createRoom = async (req, res) => {
    try {
        const { type, capacity, rate, amenities } = req.body;

        const result = await pool.query(
            `INSERT INTO rooms (type, capacity, rate, amenities)
             VALUES ($1,$2,$3,$4)
             RETURNING *`,
            [type, capacity, rate, amenities]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET ALL
const getAllRooms = async (req, res) => {
    const result = await pool.query("SELECT * FROM rooms");
    res.status(200).json(result.rows);
};

// GET BY ID
const getRoomById = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM rooms WHERE id=$1",
        [req.params.id]
    );

    res.status(200).json(result.rows[0]);
};

// DELETE
const deleteRoom = async (req, res) => {
    await pool.query("DELETE FROM rooms WHERE id=$1", [req.params.id]);
    res.status(200).json("Room deleted");
};

// UPDATE
const editRoom = async (req, res) => {
    const { type, capacity, rate } = req.body;

    const result = await pool.query(
        `UPDATE rooms
         SET type=$1, capacity=$2, rate=$3
         WHERE id=$4 RETURNING *`,
        [type, capacity, rate, req.params.id]
    );

    res.status(200).json(result.rows[0]);
};

const isRoomAvailable = async (roomId, checkinDate, checkoutDate) => {
    const result = await pool.query(
        `SELECT 1
         FROM bookings
         WHERE room_id = $1
         AND status = 'booked'
         AND checkin_date < $2
         AND checkout_date > $3
         LIMIT 1`,
        [roomId, checkoutDate, checkinDate]
    );

    return result.rows.length === 0; // no overlap = available
};

const checkAvailabilty = async (req, res) => {
    try {
        const { checkin, checkout } = req.query;
        const roomId = req.params.id;

        const available = await isRoomAvailable(roomId, checkin, checkout);

        res.status(200).json(available);

    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = { createRoom, getAllRooms, getRoomById, deleteRoom, editRoom, isRoomAvailable, checkAvailabilty };