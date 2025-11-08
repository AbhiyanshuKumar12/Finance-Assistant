const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  // We will just store the YouTube Video ID (e.g., "LXb3EKWsInQ")
  youtubeVideoId: {
    type: String,
    required: true,
    trim: true
  },
  articleText: {
    type: String,
    required: true
  },
  // We'll link the lesson to the user who created it (you, the admin)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
