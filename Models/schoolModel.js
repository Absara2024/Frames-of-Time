const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }],
}, { timestamps: true });

const School = mongoose.model("School", schoolSchema);

module.exports = School;
