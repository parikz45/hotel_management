const router = require("express").Router();
const {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
    editRoom,
    checkAvailabilty
} = require("../controllers/roomController");
const checkAdminRole = require("../middleware/checkAdminRole");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, checkAdminRole, createRoom);
router.get("/", getAllRooms);
router.get("/available/:id", checkAvailabilty);
router.get("/:id", getRoomById);
router.delete("/:id", requireAuth, checkAdminRole, deleteRoom);
router.patch("/:id", requireAuth, checkAdminRole, editRoom);


module.exports = router;