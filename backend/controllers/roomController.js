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

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
};