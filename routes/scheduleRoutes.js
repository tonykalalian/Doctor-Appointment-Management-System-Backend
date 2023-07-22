const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/schedules", scheduleController.getAllSchedules);
router.get("/schedules/:scheduleId", scheduleController.getScheduleById);
router.post("/schedules", scheduleController.createSchedule);
router.put("/schedules/:scheduleId", scheduleController.updateSchedule);
router.delete("/schedules/:scheduleId", scheduleController.deleteSchedule);

module.exports = router;
