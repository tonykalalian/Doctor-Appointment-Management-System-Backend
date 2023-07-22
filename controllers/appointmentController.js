const Appointment = require("../models/Appointment");

const getAppointmentById = async (req, res, next) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate("patient_id", "name email")
      .populate("doctor_id", "name email");
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    req.appointment = appointment;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient_id", "name email")
      .populate("doctor_id", "name email");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAppointment = async (req, res) => {
  const {
    patient_id,
    doctor_id,
    appointment_date,
    start_time,
    end_time,
    status,
  } = req.body;
  try {
    const newAppointment = new Appointment({
      patient_id,
      doctor_id,
      appointment_date,
      start_time,
      end_time,
      status,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAppointment = async (req, res) => {
  const {
    patient_id,
    doctor_id,
    appointment_date,
    start_time,
    end_time,
    status,
  } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      {
        patient_id,
        doctor_id,
        appointment_date,
        start_time,
        end_time,
        status,
      },
      { new: true }
    )
      .populate("patient_id", "name email")
      .populate("doctor_id", "name email");
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
