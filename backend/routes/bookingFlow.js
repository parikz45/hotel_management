const router= require("express").Router();
const { bookRoomFlow } = require("../controllers/bookRoomFlow");

router.post("/bookRoom", bookRoomFlow);

module.exports = router;