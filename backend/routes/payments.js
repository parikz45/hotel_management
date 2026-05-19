const router = require("express").Router();

const {
    getAllPayments,
    getPaymentByBookingId
} = require("../controllers/paymentsController");

const requireAuth = require("../middleware/requireAuth");
const checkAdminRole = require("../middleware/checkAdminRole");

// Get all payments (admin only)
router.get(
    "/",
    requireAuth,
    checkAdminRole,
    getAllPayments
);

// Get payment by booking id
router.get(
    "/:bookingid",
    getPaymentByBookingId
);

module.exports = router;