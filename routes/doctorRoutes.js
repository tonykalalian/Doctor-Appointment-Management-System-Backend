const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.get("/doctors", doctorController.getAllDoctors);
router.get("/doctors/:doctorId", doctorController.getDoctorById);
router.post("/doctors", doctorController.createDoctor);
router.put("/doctors/:doctorId", doctorController.updateDoctor);
router.delete("/doctors/:doctorId", doctorController.deleteDoctor);

module.exports = router;
