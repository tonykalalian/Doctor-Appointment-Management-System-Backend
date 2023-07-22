const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  day_of_week: { type: Number, min: 0, max: 6, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  is_available: { type: Boolean, default: true },
  is_break: { type: Boolean, default: false },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
