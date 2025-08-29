const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    amenities: {  
        type: [String]
    },
    capacity: {     
        type: Number,
        required: true
    },
    rate: {         
        type: Number,
        required: true
    },
    images: {      
        type: [String]  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Room', roomSchema);