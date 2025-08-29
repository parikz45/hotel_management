const router = require("express").Router();
const { createReview, getReviewsByRoom } = require("../controllers/reviewController");

// Create a new review
router.post("/", createReview);

// Get all reviews for a specific room
router.get("/room/:roomId", getReviewsByRoom);

module.exports = router;