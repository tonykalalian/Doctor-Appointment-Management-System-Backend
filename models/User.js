const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sign_in_method: { type: String, enum: ["Gmail", "Password"], required: true },
  type: { type: String, enum: ["Patient", "Doctor"], required: true },
  phone_nb: { type: String },
  is_activated: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
