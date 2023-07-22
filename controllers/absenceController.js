const Absence = require("../models/Absences");

const getAbsenceById = async (req, res, next) => {
  const { absenceId } = req.params;
  try {
    const absence = await Absence.findById(absenceId).populate(
      "doctor_id",
      "name email"
    );
    if (!absence) {
      return res.status(404).json({ error: "Absence not found" });
    }
    req.absence = absence;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAbsences = async (req, res) => {
  try {
    const absences = await Absence.find().populate("doctor_id", "name email");
    res.json(absences);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAbsence = async (req, res) => {
  const { doctor_id, Absence_date, Reason } = req.body;
  try {
    const newAbsence = new Absence({
      doctor_id,
      Absence_date,
      Reason,
    });
    await newAbsence.save();
    res.status(201).json(newAbsence);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAbsence = async (req, res) => {
  const { doctor_id, Absence_date, Reason } = req.body;
  try {
    const updatedAbsence = await Absence.findByIdAndUpdate(
      req.params.absenceId,
      {
        doctor_id,
        Absence_date,
        Reason,
      },
      { new: true }
    ).populate("doctor_id", "name email");
    if (!updatedAbsence) {
      return res.status(404).json({ error: "Absence not found" });
    }
    res.json(updatedAbsence);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAbsence = async (req, res) => {
  try {
    const deletedAbsence = await Absence.findByIdAndDelete(
      req.params.absenceId
    );
    if (!deletedAbsence) {
      return res.status(404).json({ error: "Absence not found" });
    }
    res.json({ message: "Absence deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
};
