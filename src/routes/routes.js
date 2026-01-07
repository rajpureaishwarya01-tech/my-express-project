const express = require('express');
const router = express.Router();
const authrouter=express.Router();
// const { User } = require('../../database/models');
// const { signup, login } = require("../controllers/userController");

// router.post("/signup", signup);
// router.post("/login", login);

// const { validate: isUuid } = require('uuid');
// // CREATE USER
// router.post('/users', async (req, res) => {
//   console.log("BODY 👉", req.body); 

//   const { firstName, lastName, email, password } = req.body;

//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "firstName, lastName, email, and password are required"
//     });
//   }

//   try {
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password
//     });

//     res.status(201).json({
//       success: true,
//       user: newUser
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Error creating user",
//       error: err.message
//     });
//   }
// });
// // get user

// // GET user by UUID
// router.get('/users/:id', async (req, res) => {
//   try {
//     let userId = req.params.id;
//     userId = userId.trim(); // Remove extra spaces/newlines

//     // Validate UUID
//     if (!isUuid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid UUID'
//       });
//     }

//     // Find user by UUID
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.json({
//       success: true,
//       user
//     });

//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching user',
//       error: err.message
//     });
//   }
// });
// // UPDATE user by UUID
// router.patch('/users/:id', async (req, res) => {
//   try {
//     let userId = req.params.id; // UUID from URL
//     userId = userId.trim();
//     // Find user by primary key (UUID)
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Update only the fields provided in request body
//     await user.update(req.body);

//     res.json({
//       success: true,
//       message: 'User updated successfully',
//       user
//     });

//   } catch (err) {
//     console.error('Error updating user:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating user',
//       error: err.message
//     });
//   }
// });
// router.delete('/users/:id', async (req, res) => {
//   try {
//     // Use let so we can trim
//     let userId = req.params.id;
//     userId = userId.trim(); // Remove spaces/newlines

//     // Optional: validate UUID
//     if (!isUuid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid UUID'
//       });
//     }

//     // Find user by UUID
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Delete user
//     await user.destroy();

//     res.json({
//       success: true,
//       message: `User with ID "${user.id}" deleted successfully`
//     });

//   } catch (err) {
//     console.error('Error deleting user:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting user',
//       error: err.message
//     });
//   }
// });

module.exports = router;