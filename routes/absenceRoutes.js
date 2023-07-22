const express = require("express");
const router = express.Router();
const absenceController = require("../controllers/absenceController");

// Routes for Absences
router.get("/absences", absenceController.getAllAbsences);
router.get("/absences/:absenceId", absenceController.getAbsenceById);
router.post("/absences", absenceController.createAbsence);
router.put("/absences/:absenceId", absenceController.updateAbsence);
router.delete("/absences/:absenceId", absenceController.deleteAbsence);

module.exports = router;
