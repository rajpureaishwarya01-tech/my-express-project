const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Op } = require('sequelize');

const db = require('../../database/models'); // ✅ FIX
const User = db.User;                        // ✅ FIX

// ================= Signup =================
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ message: 'Signup successful', userId: user.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= Login =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful', userId: user.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= Forgot Password =================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    res.json({
      message: 'Reset link generated',
      resetLink: `http://localhost:3000/api/auth/reset-password/${token}`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= Reset Password =================
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
