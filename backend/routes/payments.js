const router = require("express").Router();

const { createPayment, getPaymentsByUser, getAllPayments } = require("../controllers/paymentsController");
const checkAdminRole = require("../middleware/checkAdminRole");
const requireAuth = require("../middleware/requireAuth");

// Get all payments (admin only)
router.get("/", requireAuth, checkAdminRole, getAllPayments);

module.exports = router;