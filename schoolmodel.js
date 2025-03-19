const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

const School = mongoose.model('School', schoolSchema);

module.exports = { School };
