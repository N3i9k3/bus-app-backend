console.log("Starting server script...");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http"); // Required for Socket.io
const { Server } = require("socket.io"); // Required for Socket.io

const app = express();
const server = http.createServer(app); // Wrap express app
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); 

// Routes
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);

// Socket.io Real-time Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("locationUpdate", (data) => {
    console.log("Location received:", data);
    // Broadcast to all other connected clients (like the passenger map)
    io.emit("receiveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));