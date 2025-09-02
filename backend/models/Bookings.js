const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkinDate: {
        type: Date, 
        required: true
    },
    checkoutDate: {
        type: Date, 
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,   
        enum: ['booked', 'checked-in', 'checked-out', 'cancelled'],
        default: 'booked'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Booking', bookingSchema);