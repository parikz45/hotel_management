const router = require("express").Router();
const {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
    editRoom
} = require("../controllers/roomController");

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.delete("/:id", deleteRoom);
router.patch("/:id", editRoom);

module.exports = router;