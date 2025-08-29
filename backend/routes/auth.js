const { loginPost, signupPost, assignAdminRole, getUserIdByUsername } = require("../controllers/authController");
const checkAdminRole = require("../middleware/checkAdminRole");
const requireAuth = require("../middleware/requireAuth");

const router = require("express").Router();

router.post("/login", loginPost);
router.post("/signup", signupPost);

router.get("/getUserId/:username", requireAuth, checkAdminRole, getUserIdByUsername);
//to assign admin role, you need to provide the user ID in the request body,
//which can be obtained from the above endpoint
router.post("/assignAdminRole", requireAuth, checkAdminRole, assignAdminRole);

module.exports = router;