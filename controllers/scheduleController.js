const Schedule = require("../models/Schedule");

const getScheduleById = async (req, res, next) => {
  const { scheduleId } = req.params;
  try {
    const schedule = await Schedule.findById(scheduleId).populate(
      "doctor_id",
      "name email"
    );
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    req.schedule = schedule;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("doctor_id", "name email");
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createSchedule = async (req, res) => {
  const {
    doctor_id,
    day_of_week,
    start_time,
    end_time,
    is_available,
    is_break,
  } = req.body;
  try {
    const newSchedule = new Schedule({
      doctor_id,
      day_of_week,
      start_time,
      end_time,
      is_available,
      is_break,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateSchedule = async (req, res) => {
  const {
    doctor_id,
    day_of_week,
    start_time,
    end_time,
    is_available,
    is_break,
  } = req.body;
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      {
        doctor_id,
        day_of_week,
        start_time,
        end_time,
        is_available,
        is_break,
      },
      { new: true }
    ).populate("doctor_id", "name email");
    if (!updatedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(
      req.params.scheduleId
    );
    if (!deletedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
