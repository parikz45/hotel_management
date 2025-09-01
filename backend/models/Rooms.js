const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    amenities: {  
        type: [String]
    },
    type: {        
        type: String,
        required: true,
        enum:['deluxe','suite','standard','family']
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