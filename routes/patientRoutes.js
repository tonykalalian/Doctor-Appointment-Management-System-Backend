const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
router.get("/patients", patientController.getAllPatients);
router.get("/patients/:patientId", patientController.getPatientById);
router.post("/patients", patientController.createPatient);
router.put("/patients/:patientId", patientController.updatePatient);
router.delete("/patients/:patientId", patientController.deletePatient);

module.exports = router;
