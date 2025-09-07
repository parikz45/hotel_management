const router = require("express").Router();

const {createPayment,getPaymentsByUser,getAllPayments}=require("../controllers/paymentsController");

// Get all payments (admin only)
router.get("/", getAllPayments);

module.exports = router;