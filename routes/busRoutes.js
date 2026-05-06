// const express = require("express");
// const router = express.Router();
// const busController = require("../controllers/busController");
// const authMiddleware = require("../Middleware/authMiddleware");

// // 1. SEARCH BUSES (Must be ABOVE /:id)
// // Endpoint: GET /api/buses/search?from=Nagpur&to=Pune
// router.get("/search", authMiddleware, busController.searchBuses);

// // 2. GET ALL BUSES
// // Endpoint: GET /api/buses
// router.get("/", authMiddleware, busController.getBuses);

// // 3. GET SINGLE BUS BY ID
// // Endpoint: GET /api/buses/1
// router.get("/:id", authMiddleware, busController.getBusById);

// // 4. BOOK A TICKET (Deduct Seat)
// // Endpoint: PATCH /api/buses/book/1
// router.patch("/book/:id", authMiddleware, busController.bookBus);

// // 5. ADMIN ROUTES (Create, Update, Delete)
// router.get("/search", busController.searchBuses);
// router.post("/", authMiddleware, busController.createBus);
// router.put("/:id", authMiddleware, busController.updateBus);
// router.delete("/:id", authMiddleware, busController.deleteBus);

// module.exports = router;

















// const authMiddleware = require("../Middleware/authMiddleware");
// const checkRole = require("../Middleware/roleMiddleware");
// const busController = require("../controllers/busController");

// // Admin only
// // router.post("/", authMiddleware, checkRole("admin"), busController.createBus);
// // router.put("/:id", authMiddleware, checkRole("admin"), busController.updateBus);
// // router.delete("/:id", authMiddleware, checkRole("admin"), busController.deleteBus);
// // REMOVE authMiddleware temporarily

// router.post("/", busController.createBus);
// router.put("/:id", busController.updateBus);
// router.delete("/:id", busController.deleteBus);

// router.post("/:id/book", busController.bookSeat);

// // All logged in users
// // router.get("/", authMiddleware, busController.getBuses);
// router.get("/", busController.getBuses);

// module.exports = router;







// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../Middleware/authMiddleware");
// const checkRole = require("../Middleware/roleMiddleware");
// const busController = require("../controllers/busController");

// Admin only
// router.post("/", authMiddleware, checkRole("admin"), busController.createBus);
// router.put("/:id", authMiddleware, checkRole("admin"), busController.updateBus);
// router.delete("/:id", authMiddleware, checkRole("admin"), busController.deleteBus);

// Temporary without auth
// router.post("/", busController.createBus);
// router.put("/:id", busController.updateBus);
// router.delete("/:id", busController.deleteBus);

// router.post("/:id/book", busController.bookSeat);

// Get all buses
// router.get("/", busController.getBuses);

// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../Middleware/authMiddleware");
// const roleMiddleware = require("../Middleware/roleMiddleware");
// const busController = require("../controllers/busController");

// // All admin roles
// router.post("/", authMiddleware, roleMiddleware("admin"), busController.createBus);
// router.put("/:id", authMiddleware, roleMiddleware("admin"), busController.updateBus);
// router.delete("/:id", authMiddleware, roleMiddleware("admin"), busController.deleteBus);

// //Get buses for all logged in users
// router.get("/search", busController.searchBuses);
// router.get("/", busController.getBuses);

// module.exports = router;







const express = require("express");
const router = express.Router();

const busController = require("../controllers/busController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

// admin only
router.get("/search", authMiddleware, busController.searchBuses);
router.post("/", authMiddleware, roleMiddleware("admin"), busController.createBus);
router.put("/:id", authMiddleware, roleMiddleware("admin"), busController.updateBus);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), busController.deleteBus);

// user can view + book
router.get("/", busController.getBuses);
router.post("/:id/book", authMiddleware, busController.bookSeat);

module.exports = router;

