const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql-bus-app-nikitamehare8-9ba0.i.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_ytw49N4SgM3Szw82cjq",
  database: "defaultdb",
  port: 16037,
  ssl: { rejectUnauthorized: false }
});

module.exports = db.promise();