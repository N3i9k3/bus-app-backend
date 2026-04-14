require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Import routes
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1 + 1 AS result");
    res.json({
      message: "DB Connected ✅",
      result: rows[0].result
    });
  } catch (err) {
    console.error("ROOT ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create HTTP server
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("locationUpdate", async (data) => {
    console.log("Location received:", data);

    const { busId, lat, lng } = data;

    try {
      await db.execute(
        `INSERT INTO bus_locations (bus_id, latitude, longitude)
         VALUES (?, ?, ?)`,
        [busId, lat, lng]
      );

      io.emit("locationUpdate", {
        busId,
        lat,
        lng
      });

    } catch (error) {
      console.error("DB ERROR:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});