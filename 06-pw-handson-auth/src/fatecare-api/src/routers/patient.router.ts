import express from "express"
import PatientController from "../controllers/patient.controller"

const router = express.Router();

router.get("/:id", PatientController.getPatient);
router.get("/", PatientController.getPatients);
router.post("/", PatientController.addPatient);
router.patch("/:id", PatientController.updatePatient);
router.delete("/:id", PatientController.deletePatient);

export default router;