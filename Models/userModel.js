const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
