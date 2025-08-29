const Review = require('../models/Reviews');

// Create a new review
const createReview = async (req, res) => {
    const newReview = new Review(req.body);   
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all reviews for a specific room
const getReviewsByRoom = async (req, res) => {
    try {
        const reviews = await Review.find({ room: req.params.roomId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createReview, getReviewsByRoom };