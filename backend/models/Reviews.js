const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    rating: {
        type: Number,   
        required: true,
        min: 1,
        max: 5    
    },
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewDate: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Review', reviewsSchema);