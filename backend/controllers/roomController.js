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

module.exports = { createRoom, getAllRooms, getRoomById, deleteRoom, editRoom };