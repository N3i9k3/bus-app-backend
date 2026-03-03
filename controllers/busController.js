const db = require("../config/db");

// CREATE BUS (Admin only)
exports.createBus = async (req, res) => {
  const { bus_number, capacity } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO buses (bus_number, capacity) VALUES (?, ?)",
      [bus_number, capacity]
    );

    res.status(201).json({ message: "Bus created successfully" });
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
    await db.execute("DELETE FROM buses WHERE id = ?", [id]);
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};