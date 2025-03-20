const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolName: { type: String, required: true },
  graduateYear: [{ type: Number, year: String }],
  comments: [{ type: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;

