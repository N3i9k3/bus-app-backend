const db = require("../config/db");

// CREATE BUS (Updated to include day_of_week and travel_date)
exports.createBus = async (req, res) => {
  const { 
    bus_number, capacity, origin, destination, 
    departure_time, arrival_time, fare, route_path,
    day_of_week, travel_date 
  } = req.body;

  try {
    await db.execute(
      `INSERT INTO buses (
        bus_number, capacity, origin, destination, 
        departure_time, arrival_time, fare, available_seats, 
        route_path, day_of_week, travel_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [
        bus_number, capacity, origin, destination, 
        departure_time, arrival_time, fare, capacity, 
        route_path, day_of_week || 'Daily', travel_date || null
      ]
    );
    res.status(201).json({ message: "Bus created successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL BUSES
exports.getBuses = async (req, res) => {
  try {
    const [buses] = await db.execute("SELECT * FROM buses");
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE BUS BY ID
exports.getBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM buses WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Bus not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BUS (Updated to include day_of_week and travel_date)
exports.updateBus = async (req, res) => {
  const { id } = req.params;
  const { 
    bus_number, capacity, origin, destination, 
    departure_time, arrival_time, fare, available_seats, 
    route_path, day_of_week, travel_date 
  } = req.body;

  try {
    await db.execute(
      `UPDATE buses SET 
        bus_number = ?, capacity = ?, origin = ?, destination = ?, 
        departure_time = ?, arrival_time = ?, fare = ?, available_seats = ?, 
        route_path = ?, day_of_week = ?, travel_date = ? 
      WHERE id = ?`, 
      [
        bus_number, capacity, origin, destination, 
        departure_time, arrival_time, fare, available_seats, 
        route_path, day_of_week, travel_date, id
      ]
    );
    res.json({ message: "Bus updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BUS
exports.deleteBus = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM buses WHERE id = ?", [id]);
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH BUSES BY ROUTE & DATE (The Updated Logic)
exports.searchBuses = async (req, res) => {
  const { from, to, date } = req.query;

  if (!date) return res.status(400).json({ error: "Date is required" });

  try {
    // 1. Convert date string (e.g., '2026-04-10') into a Day Name (e.g., 'Friday')
    const dateObj = new Date(date);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj);

    // 2. Query to match route AND (Specific Date OR Weekday OR Daily)
    const query = `
      SELECT * FROM buses 
      WHERE origin = ? AND destination = ? 
      AND (travel_date = ? OR day_of_week = ? OR day_of_week = 'Daily')
    `;

    const [rows] = await db.execute(query, [from, to, date, dayName]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database query failed: " + err.message });
  }
};

// BOOK TICKET (Deduct Seat)
exports.bookBus = async (req, res) => {
  const { id } = req.params;
  try {
    const [bus] = await db.execute("SELECT available_seats FROM buses WHERE id = ?", [id]);
    if (bus.length > 0 && bus[0].available_seats > 0) {
      await db.execute("UPDATE buses SET available_seats = available_seats - 1 WHERE id = ?", [id]);
      res.json({ message: "Booking confirmed! Seat reserved." });
    } else {
      res.status(400).json({ error: "No seats available" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BUS LOCATION (For GPS Tracker)
exports.getBusLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT lat, lng FROM locations WHERE bus_id = ? ORDER BY created_at DESC LIMIT 1", 
      [id]
    );
    res.json(rows[0] || { lat: 21.1458, lng: 79.0882 }); // Default to Nagpur
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
