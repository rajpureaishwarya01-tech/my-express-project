const express = require('express');
const router = express.Router();
const { User, Course } = require('../../database/models');
const { validate: isUuid } = require('uuid');

// CREATE USER
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET USER BY UUID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!isUuid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid UUID' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, message: 'Error fetching user', error: err.message });
  }
});

// UPDATE USER BY UUID
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.update(req.body);

    res.json({ success: true, message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: 'Error updating user', error: err.message });
  }
});

// DELETE USER BY UUID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!isUuid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid UUID' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.destroy();

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Error deleting user', error: err.message });
  }
});

// CREATE COURSE AND ENROLL USER
router.post('/create-and-enroll', async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const course = await Course.create({ title, description });
    await user.addCourse(course); // inserts into user_courses

    res.status(201).json({
      success: true,
      message: 'Course created and user enrolled successfully',
      course,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
