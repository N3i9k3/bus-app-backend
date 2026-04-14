const db = require("../config/db");

// ✅ BOOK TICKET
exports.bookTicket = async (req, res) => {
  const { busId, passengerName, seatNumber } = req.body;

  try {
    // 🔥 CHECK IF SEAT ALREADY BOOKED
    const [existing] = await db.execute(
      "SELECT * FROM bookings WHERE bus_id = ? AND seat_number = ?",
      [busId, seatNumber]
    );

    console.log("Incoming:", busId, seatNumber);
    console.log("Existing rows:", existing);

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Seat already booked ❌"
      });
    }

    // ✅ INSERT BOOKING
    await db.execute(
      `INSERT INTO bookings
      (bus_id, passenger_name, seat_number)
      VALUES (?, ?, ?)`,
      [busId, passengerName, seatNumber]
    );

    // // 🔥 UPDATE PASSENGER COUNT
    // await db.execute(
    //   `UPDATE buses
    //   SET passengers = passengers + 1
    //   WHERE id = ?`,
    //   [busId]
    // );

    res.json({
      message: "Ticket booked successfully 🎫"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ✅ GET BOOKED SEATS
exports.getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    const [rows] = await db.execute(
      "SELECT seat_number FROM bookings WHERE bus_id = ?",
      [busId]
    );

    res.json(rows.map(r => Number(r.seat_number)));

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server error"
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const { passengerName } = req.params;

    const [rows] = await db.execute(
      `SELECT 
        bk.id,
        bk.seat_number,
        bk.passenger_name,
        b.bus_number,
        b.source,
        b.destination,
        b.departure_time,
        b.arrival_time,
        b.fare
      FROM bookings bk
      JOIN buses b
      ON bk.bus_id = b.id
      WHERE bk.passenger_name = ?`,
      [passengerName]
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    const [rows] = await db.execute(
      "SELECT seat_number FROM bookings WHERE bus_id = ?",
      [busId]
    );

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM bookings WHERE id = ?",
      [id]
    );

    res.json({
      message: "Ticket cancelled successfully ❌🎫"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};