const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review_text: { type: String },
  rating: { type: Number, min: 0, max: 5 },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
