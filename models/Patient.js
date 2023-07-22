const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  age: { type: String },
  gender: { type: String },
  blood_type: { type: String },
  height: { type: String },
  weight: { type: String },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
