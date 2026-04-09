const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const authMiddleware = require("../middleware/authMiddleware");

// 1. SEARCH BUSES (Must be ABOVE /:id)
// Endpoint: GET /api/buses/search?from=Nagpur&to=Pune
router.get("/search", authMiddleware, busController.searchBuses);

// 2. GET ALL BUSES
// Endpoint: GET /api/buses
router.get("/", authMiddleware, busController.getBuses);

// 3. GET SINGLE BUS BY ID
// Endpoint: GET /api/buses/1
router.get("/:id", authMiddleware, busController.getBusById);

// 4. BOOK A TICKET (Deduct Seat)
// Endpoint: PATCH /api/buses/book/1
router.patch("/book/:id", authMiddleware, busController.bookBus);

// 5. ADMIN ROUTES (Create, Update, Delete)
router.get("/search", busController.searchBuses);
router.post("/", authMiddleware, busController.createBus);
router.put("/:id", authMiddleware, busController.updateBus);
router.delete("/:id", authMiddleware, busController.deleteBus);

module.exports = router;