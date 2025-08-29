const router = require("express").Router();

const {createPayment,getPaymentsByUser,getAllPayments}=require("../controllers/paymentsController");

// Create a new payment
router.post("/", createPayment);

// Get all payments of a specific user
router.get("/user/:userId", getPaymentsByUser);

// Get all payments (admin only)
router.get("/", getAllPayments);

module.exports = router;