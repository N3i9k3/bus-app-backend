const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../Middleware/authMiddleware");

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