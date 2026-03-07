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

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    },
});

// socket event handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("locationUpdate", async (data) => {

  console.log("Location received:", data);

  const bus_id = 1;
  const { lat, lng } = data;

  try {

    await db.execute(
      `INSERT INTO bus_locations (bus_id, latitude, longitude)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
       latitude = VALUES(latitude),
       longitude = VALUES(longitude)`,
      [bus_id, lat, lng]
    );

    io.emit("busLocation", { lat, lng });

  } catch (error) {
    console.error("DB ERROR:", error);
  }

});

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});