const pool = require("../config/db");

// Get all payments
exports.getAllPayments = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM payments"
        );

        res.status(200).json(result.rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
};

// Get payment by booking id
exports.getPaymentByBookingId = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM payments WHERE booking_id=$1",
            [req.params.bookingid]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                error: "Payment not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
};