// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // middlewares
// app.use(cors());
// app.use(express.json());

// // test route
// app.get("/", (req, res) => {
//   res.send("Bus App Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





const express = require('express');
const mysql = require('mysql2');
require('dotenv').config(); // Load .env file

const app = express();
const port = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Attempt to connect
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed!');
    console.error('Error message:', err.message); // Show exact reason
    process.exit(1); // Stop server if DB fails
  } else {
    console.log('MySQL Connected'); // Successful connection
  }
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
