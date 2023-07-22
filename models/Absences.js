const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Absence_date: { type: Date, required: true },
  Reason: { type: String },
});

const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;
