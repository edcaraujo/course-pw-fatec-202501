import express from "express"
import PatientController from "../controllers/patient.controller"
import userController from "../controllers/user.controller";

const router = express.Router();

router.post("/", userController.addUser);

export default router;