// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db"); // import MySQL pool from config

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Test route to check DB connection
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result"); // simple query
    res.json({ message: "DB Connected ✅", result: rows[0].result });
  } catch (err) {
    console.error("❌ Database Error Full Object:", err); // log full error
    res.status(500).json({ 
      error: err.code || err.sqlMessage || JSON.stringify(err) // show something useful
    });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





