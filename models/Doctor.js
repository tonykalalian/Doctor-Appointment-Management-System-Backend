const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profile_image: { type: String },
  experience: { type: Number },
  qualification: { type: String },
  specialty: { type: String },
  description: { type: String },
  languages_spoken: { type: [String] },
  consultation_fee: { type: Number },
  exemption_price: { type: Number },
  social_media_links: { type: [String] },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  holidays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Holiday" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
