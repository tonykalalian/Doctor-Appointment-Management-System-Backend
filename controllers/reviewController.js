const Review = require("../models/Review");

const getReviewById = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId)
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email");
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    req.review = review;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  const { doctor_id, patient_id, review_text, rating } = req.body;
  try {
    const newReview = new Review({
      doctor_id,
      patient_id,
      review_text,
      rating,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  const { doctor_id, patient_id, review_text, rating } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        doctor_id,
        patient_id,
        review_text,
        rating,
      },
      { new: true }
    )
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email");
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
