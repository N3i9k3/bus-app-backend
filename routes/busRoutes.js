const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");
const busController = require("../controllers/busController");

// Admin only
// router.post("/", authMiddleware, checkRole("admin"), busController.createBus);
// router.put("/:id", authMiddleware, checkRole("admin"), busController.updateBus);
// router.delete("/:id", authMiddleware, checkRole("admin"), busController.deleteBus);
// REMOVE authMiddleware temporarily

router.post("/", busController.createBus);
router.put("/:id", busController.updateBus);
router.delete("/:id", busController.deleteBus);

router.post("/:id/book", busController.bookSeat);

// All logged in users
// router.get("/", authMiddleware, busController.getBuses);
router.get("/", busController.getBuses);

module.exports = router;