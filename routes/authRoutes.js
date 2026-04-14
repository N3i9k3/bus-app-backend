// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;




const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const busController = require("../controllers/busController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");


router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user
  });
});

module.exports = router;