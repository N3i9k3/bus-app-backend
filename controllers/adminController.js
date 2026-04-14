// const db = require("../config/db");

// exports.changeRole = async (req, res) => {
//   const { userId, role } = req.body;

//   await db.execute(
//     "UPDATE users SET role = ? WHERE id = ?",
//     [role, userId]
//   );

//   res.json({ message: "Role updated successfully" });
// };









// const db = require("../config/db");

// exports.changeRole = async (req, res) => {
//   const { id } = req.params;
//   const { role } = req.body;

//   try {
//     await db.execute(
//       "UPDATE users SET role = ? WHERE id = ?",
//       [role, id]
//     );

//     res.json({
//       message: `Role updated to ${role}`
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message
//     });
//   }
// };

// exports.getUsers = async (req, res) => {
//   const [rows] = await db.execute("SELECT * FROM users");
//   res.json(rows);
// };

// exports.updateRole = async (req, res) => {
//   const { role } = req.body;
//   const { id } = req.params;

//   await db.execute(
//     "UPDATE users SET role = ? WHERE id = ?",
//     [role, id]
//   );

//   res.json({ message: "Role updated successfully" });
// };










const db = require("../config/db");

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, role FROM users"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ROLE
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    await db.execute(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id]
    );

    res.json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};