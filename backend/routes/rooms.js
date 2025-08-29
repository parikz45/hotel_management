const router = require("express").Router();
const {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
} = require("../controllers/roomController");

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.delete("/:id", deleteRoom);

module.exports = router;