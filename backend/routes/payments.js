const router = require("express").Router();

const {getPaymentByBookingId,getAllPayments}=require("../controllers/paymentsController");

// Get all payments (admin only)
router.get("/", requireAuth, checkAdminRole, getAllPayments);

// Get a payment by booking id
router.get("/:bookingid", getPaymentByBookingId);

module.exports = router;