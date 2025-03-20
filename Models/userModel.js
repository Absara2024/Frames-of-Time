const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // make a field unique!
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true }, // doesn't have to be required
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
