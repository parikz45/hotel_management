const router = require("express").Router();
const {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
    editRoom,
    checkAvailabilty
} = require("../controllers/roomController");

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/available/:id",checkAvailabilty)
router.get("/:id", getRoomById);
router.delete("/:id", deleteRoom);
router.patch("/:id", editRoom);


module.exports = router;