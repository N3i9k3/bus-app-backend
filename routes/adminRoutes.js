// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const authMiddleware = require("../Middleware/authMiddleware");
// const roleMiddleware = require("../Middleware/roleMiddleware");

// router.put("/change-role", authMiddleware, roleMiddleware("admin"), adminController.changeRole);
// router.get("/search", busController.searchBuses);

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const busController = require("../controllers/busController");
// const authMiddleware = require("../Middleware/authMiddleware");
// const roleMiddleware = require("../Middleware/roleMiddleware");



// router.get("/users", adminMiddleware, adminController.getUsers);

// router.put("/users/:id/role", adminMiddleware, adminController.updateRole);

// router.post(
//   "/",
//   authMiddleware,
//   roleMiddleware("admin"),
//   busController.createBus
// );

// module.exports = router;










const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

// 🔥 GET ALL USERS (ADMIN ONLY)
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getUsers
);

// 🔥 UPDATE ROLE
router.put(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateRole
);

module.exports = router;