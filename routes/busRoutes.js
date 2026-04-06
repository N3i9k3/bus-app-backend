const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");
const busController = require("../controllers/busController");

router.post("/", authMiddleware, checkRole("admin"), busController.createBus);
router.put("/:id", authMiddleware, checkRole("admin"), busController.updateBus);
router.delete("/:id", authMiddleware, checkRole("admin"), busController.deleteBus);
router.get("/", authMiddleware, busController.getBuses);

module.exports = router;