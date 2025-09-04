const router = require("express").Router();
const {
    createBooking,
    getBookingsByUser,
    getAllBookings,
    deleteBooking
} = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Get all bookings of a specific user
router.get("/user/:userId", getBookingsByUser);

// Get all bookings (admin only)
router.get("/", getAllBookings);

// Delete a booking
router.delete("/:id", deleteBooking);

module.exports = router;