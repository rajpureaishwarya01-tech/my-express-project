const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');
const { validate: isUuid } = require('uuid');

/**
 * CREATE USER
 * POST /api/users
 */
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'firstName, lastName, email, and password are required'
    });
  }

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    res.status(201).json({
      success: true,
      user: newUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: err.message
    });
  }
});

/**
 * GET USER BY UUID
 * GET /api/users/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!isUuid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UUID'
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: err.message
    });
  }
});

/**
 * UPDATE USER BY UUID
 * PATCH /api/users/:id
 */
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!isUuid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UUID'
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.update(req.body);

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message
    });
  }
});

/**
 * DELETE USER BY UUID
 * DELETE /api/users/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!isUuid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UUID'
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message
    });
  }
});


//create courses

module.exports = router;
