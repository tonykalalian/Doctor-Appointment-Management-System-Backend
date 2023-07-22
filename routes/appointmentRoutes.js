const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/appointments", appointmentController.getAllAppointments);
router.get(
  "/appointments/:appointmentId",
  appointmentController.getAppointmentById
);
router.post("/appointments", appointmentController.createAppointment);
router.put(
  "/appointments/:appointmentId",
  appointmentController.updateAppointment
);
router.delete(
  "/appointments/:appointmentId",
  appointmentController.deleteAppointment
);

module.exports = router;
