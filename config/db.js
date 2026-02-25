const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mysql@123",  // 👈 put your real password
  database: "bus_app",
});

module.exports = db.promise();