const router = require("express").Router();
const {
    createBooking,
    getBookingsByUser,
    getAllBookings,
    getBookingById,
    deleteBooking
} = require("../controllers/bookingController");
const checkAdminRole = require("../middleware/checkAdminRole");
const requireAuth = require("../middleware/requireAuth");

// Create a new booking
router.post("/", requireAuth, createBooking);

// Get all bookings of a specific user
router.get("/user/:userId", requireAuth, getBookingsByUser);

// Get a booking by ID 
router.get("/:id", requireAuth, getBookingById);

// Get all bookings (admin only)
router.get("/", requireAuth, checkAdminRole, getAllBookings);

// Delete a booking
router.delete("/:id", requireAuth, deleteBooking);

module.exports = router;