require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS support for your React Frontend
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:3000", "http://localhost:5173"], // Covers React and Vite defaults
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);

// Socket.io Real-time Logic
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // When a driver (or simulator) sends a location update
  socket.on("locationUpdate", (data) => {
    console.log("Location Update Received:", data);
    
    // Broadcast the location to all connected passengers/clients
    // 'data' should typically contain: { busId: 1, lat: 21.14, lng: 79.08 }
    io.emit("receiveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Base Route
app.get("/", (req, res) => res.send("Nagpur Hub API is running"));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});