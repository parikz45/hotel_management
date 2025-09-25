const Bookings = require("../models/Bookings");
const Rooms = require("../models/Rooms");

// Create a new room
const createRoom = async (req, res) => {
    const newRoom = new Rooms(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

// edit a room 
const editRoom = async (req, res) => {
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a specific room by ID
const getRoomById = async (req, res) => {
    try {
        const room = await Rooms.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a room
const deleteRoom = async (req, res) => {
    try {
        await Rooms.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

const isRoomAvailable = async (roomId, checkinDate, checkoutDate) => {
    const overlappingBooking = await Bookings.findOne({
        room: roomId,
        status: "booked",
        $or: [
            {
                checkinDate: { $lt: checkoutDate },
                checkoutDate: { $gt: checkinDate }
            }
        ]
    });

    return !overlappingBooking;
};

// check room availability
const checkAvailabilty = async (req, res) => {
    try {
        const { checkin, checkout } = req.query;
        const roomId = req.params.id;

        const available = await isRoomAvailable(roomId, checkin, checkout);
        res.status(200).json(available);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
    editRoom,
    checkAvailabilty
};