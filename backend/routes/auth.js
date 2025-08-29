const { loginPost, signupPost } = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", loginPost);
router.post("/signup", signupPost);

module.exports = router;