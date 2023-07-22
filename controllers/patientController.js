const Patient = require("../models/Patient");

const getPatientById = async (req, res, next) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId).populate(
      "user_id",
      "name email"
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    req.patient = patient;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user_id", "name email");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPatient = async (req, res) => {
  const { age, gender, blood_type, height, weight, user_id } = req.body;
  try {
    const newPatient = new Patient({
      age,
      gender,
      blood_type,
      height,
      weight,
      user_id,
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePatient = async (req, res) => {
  const { age, gender, blood_type, height, weight, user_id } = req.body;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.patientId,
      {
        age,
        gender,
        blood_type,
        height,
        weight,
        user_id,
      },
      { new: true }
    ).populate("user_id", "name email");
    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(
      req.params.patientId
    );
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
