const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const {
  bookTicket,
  getBookedSeats
} = require("../controllers/bookingController");

router.post("/", bookTicket); // ✅ correct function
router.get("/seats/:busId", getBookedSeats);
router.get("/history/:passengerName", bookingController.getMyBookings);
router.delete("/:id", bookingController.cancelBooking);

module.exports = router;