const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
