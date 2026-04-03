const db = require("../config/db");

// CREATE BUS (Admin only)
exports.createBus = async (req, res) => {
  const { bus_number, capacity, driver_name, source, destination } = req.body;

  try {
    await db.execute(
      `INSERT INTO buses (bus_number, capacity, driver_name, source, destination, passengers)
       VALUES (?, ?, ?, ?, ?, 0)`,
      [bus_number, capacity, driver_name, source, destination]
    );

    res.json({ message: "Bus created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL BUSES
exports.getBuses = async (req, res) => {
  try {
    const [buses] = await db.execute("SELECT * FROM buses WHERE is_deleted = FALSE");
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BUS (Admin only)
exports.updateBus = async (req, res) => {
  const { id } = req.params;
  const { bus_number, capacity } = req.body;

  try {
    await db.execute(
      "UPDATE buses SET bus_number = ?, capacity = ? WHERE id = ?",
      [bus_number, capacity, id]
    );

    res.json({ message: "Bus updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BUS (Admin only)
exports.deleteBus = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute(
  "UPDATE buses SET is_deleted = TRUE WHERE id = ?",
  [id]
);
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookSeat = async (req, res) => {
  const { id } = req.params;

  try {
    const [bus] = await db.execute(
      "SELECT capacity, passengers FROM buses WHERE id = ?",
      [id]
    );

    if (bus.length === 0) {
      return res.status(404).json({ message: "Bus not found" });
    }

    if (bus[0].passengers >= bus[0].capacity) {
      return res.status(400).json({ message: "Bus is full" });
    }

    await db.execute(
      "UPDATE buses SET passengers = passengers + 1 WHERE id = ?",
      [id]
    );

    res.json({ message: "Seat booked successfully. ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};