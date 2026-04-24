const pool = require("../config/db");

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM payments");
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
};