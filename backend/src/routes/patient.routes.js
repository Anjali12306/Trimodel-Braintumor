import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { addPatient, getDoctorPatients } from "../controllers/patient.controller.js";
import User from "../models/User.js";
import Patient from "../models/Patient.js"; // ✅ ADD THIS

const router = express.Router();

// Receptionist → add patient
router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  addPatient
);

// ✅ Receptionist → get all patients (FIX)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
  }
);

// Receptionist → get doctors list
router.get(
  "/doctors",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  async (req, res) => {
    const doctors = await User.find({ role: "DOCTOR" }).select("_id email");
    res.json(doctors);
  }
);

// Doctor → get own patients
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getDoctorPatients
);

export default router;