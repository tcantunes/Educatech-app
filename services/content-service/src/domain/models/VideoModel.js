const mongoose = require('../../infrastructure/database/mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Video', videoSchema);
