import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { addPatient, getDoctorPatients } from "../controllers/patient.controller.js";
import User from "../models/User.js"; // 👈 ADD THIS

const router = express.Router();

// Receptionist → add patient
router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  addPatient
);

// Receptionist → get doctors list (NEW ✅)
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
