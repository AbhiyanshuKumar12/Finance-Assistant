const router = require('express').Router();
const Lesson = require('../models/lesson.model');
const authMiddleware = require('../middleware/auth');

// --- GET ALL LESSONS ---
// @route   GET /api/lessons
// @desc    Get all financial lessons
// @access  Public (everyone can see them)
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 }); // Newest first
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- GET A SINGLE LESSON BY ID ---
// @route   GET /api/lessons/:id
// @desc    Get one lesson by its ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    res.status(500).send('Server Error');
  }
});

// --- ADD A NEW LESSON ---
// @route   POST /api/lessons
// @desc    Add a new lesson
// @access  Private (Only you, the logged-in admin, can do this)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, topic, youtubeVideoId, articleText } = req.body;

    const newLesson = new Lesson({
      title,
      topic,
      youtubeVideoId,
      articleText,
      user: req.user.id // Get the user ID from the authMiddleware
    });

    const lesson = await newLesson.save();
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
