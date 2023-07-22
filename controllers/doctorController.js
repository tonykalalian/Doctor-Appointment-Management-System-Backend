const Doctor = require("../models/Doctor");

const getDoctorById = async (req, res, next) => {
  const { doctorId } = req.params;
  try {
    const doctor = await Doctor.findById(doctorId).populate(
      "user_id",
      "name email"
    );
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    req.doctor = doctor;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user_id", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createDoctor = async (req, res) => {
  const {
    user_id,
    profile_image,
    experience,
    qualification,
    specialty,
    description,
    languages_spoken,
    consultation_fee,
    exemption_price,
    social_media_links,
  } = req.body;
  try {
    const newDoctor = new Doctor({
      user_id,
      profile_image,
      experience,
      qualification,
      specialty,
      description,
      languages_spoken,
      consultation_fee,
      exemption_price,
      social_media_links,
    });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDoctor = async (req, res) => {
  const {
    user_id,
    profile_image,
    experience,
    qualification,
    specialty,
    description,
    languages_spoken,
    consultation_fee,
    exemption_price,
    social_media_links,
  } = req.body;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.doctorId,
      {
        user_id,
        profile_image,
        experience,
        qualification,
        specialty,
        description,
        languages_spoken,
        consultation_fee,
        exemption_price,
        social_media_links,
      },
      { new: true }
    ).populate("user_id", "name email");
    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
