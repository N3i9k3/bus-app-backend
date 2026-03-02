require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();   // ✅ FIRST create app

app.use(cors());
app.use(express.json());

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");   // ✅ correct spelling

// Test DB Connection
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "DB Connected ✅", result: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});