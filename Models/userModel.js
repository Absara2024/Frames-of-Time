const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolName:{type: String, required: true },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  email: { type: String, required: true, unique: true }, // make a field unique!
  graduateYear: { type: String, required: true },
  comment: { type: String }, // doesn't have to be required
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
