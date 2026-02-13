import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createVisit, uploadMRI } from "../controllers/visit.controller.js";
import multer from "multer";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create visit
router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  createVisit
);

// ✅ UPLOAD MRI (THIS WAS MISSING)
router.post(
  "/:visitId/upload",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  upload.single("mri"), // 👈 must match frontend
  uploadMRI
);
import Visit from "../models/Visit.js";

// Doctor: get visits of a patient
router.get(
  "/patient/:patientId",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  async (req, res) => {
    const visits = await Visit.find({
      patient: req.params.patientId,
    }).sort({ createdAt: -1 });

    res.json(visits);
  }
);


export default router;
