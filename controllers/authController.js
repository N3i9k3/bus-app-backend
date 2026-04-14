// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//       [name, email, hashedPassword, "passenger"]
//     );

//     res.json({ message: "User Registered Successfully ✅" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (users.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.json({ message: "Login successful ✅", token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };












// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// ================= REGISTER =================
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;  // role removed for security

//     const [existingUser] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//       [name, email, hashedPassword, "passenger"] // always passenger
//     );

//     res.json({ message: "User Registered Successfully ✅" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   await db.execute(
//     "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//     [name, email, password, "user"]
//   );

//   res.json({ message: "Registered successfully" });
// };

// ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const [users] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (users.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = users[0];

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful. ✅",
//       token,
//       role: user.role
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const jwt = require("jsonwebtoken");
// const db = require("../config/db");
// const bcrypt = require("bcryptjs");

// ================= REGISTER =================
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   await db.execute(
//     "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//     [name, email, password, "passenger"]
//   );

//   res.json({
//     message: "Registered successfully"
//   });
// };
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   await db.execute(
//     "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//     [name, email, password, "user"]
//   );

//   res.json({ message: "Registered successfully" });
// };

// ================= LOGIN =================
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(400).json({
//         message: "User not found"
//       });
//     }

//     const user = rows[0];

//     if (user.password !== password) {
//       return res.status(401).json({
//         message: "Invalid password"
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//         name: user.name
//       },
//       "mySecretKey",
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       error: error.message
//     });
//   }
// };
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(400).json({
//         message: "User not found"
//       });
//     }

//     const user = rows[0];

//     // optional password check
//     if (user.password !== password) {
//       return res.status(401).json({
//         message: "Invalid password"
//       });
//     }

//     res.json({
//       token: "dummy-token",
//       user: {
//         id: user.id,
//         name: user.name,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({
//       error: error.message
//     });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const [rows] = await db.execute(
//     "SELECT * FROM users WHERE email = ? AND password = ?",
//     [email, password]
//   );

//   if (rows.length === 0) {
//     return res.status(400).json({
//       message: "User not found"
//     });
//   }

//   const user = rows[0];

//   const token = jwt.sign(
//     {
//       id: user.id,
//       role: user.role
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1d"
//     }
//   );

//   res.json({
//     token,
//     user: {
//       id: user.id,
//       name: user.name,
//       role: user.role
//     }
//   });
// };







// ================= LOGIN =================
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= REGISTER =================
// const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ Check if email already exists
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user with default role = user
    await db.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "user"]
    );

    res.status(201).json({
      message: "Registered successfully ✅"
    });

  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      message: "Registration failed ❌",
      error: error.message
    });
  }
};