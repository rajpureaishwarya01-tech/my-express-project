const express = require('express');
const router = express.Router();

const { User, Course, UserCourse } = require('../../database/models');
const { validate: isUuid } = require('uuid');

/**
 * CREATE COURSE
 * POST /api/courses
 */
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Course title is required'
    });
  }

  try {
    const course = await Course.create({
      title,
      description
    });

    res.status(201).json({
      success: true,
      course
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: err.message
    });
  }
});
router.post('/enroll', async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({
      success: false,
      message: 'userId and courseId are required'
    });
  }

  if (!isUuid(userId) || !isUuid(courseId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid UUID format'
    });
  }

  try {
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        message: 'User or Course not found'
      });
    }

    // Prevent duplicate enrollment
    const alreadyEnrolled = await UserCourse.findOne({
      where: { userId, courseId }
    });

    if (alreadyEnrolled) {
      return res.status(409).json({
        success: false,
        message: 'User already enrolled in this course'
      });
    }

    await UserCourse.create({
      userId,
      courseId
    });

    res.status(201).json({
      success: true,
      message: 'User enrolled successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling course',
      error: err.message
    });
  }
});
module.exports = router;
