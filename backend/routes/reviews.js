const router = require("express").Router();
const { createReview, getReviewsByRoom } = require("../controllers/reviewController");
const requireAuth = require("../middleware/requireAuth");

// Create a new review
router.post("/", requireAuth, createReview);

// Get all reviews for a specific room
router.get("/room/:roomId", getReviewsByRoom);

module.exports = router;