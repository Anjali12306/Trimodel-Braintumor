import Visit from "../models/Visit.js";

// ✅ Create Visit
export const createVisit = async (req, res) => {
  try {
    console.log("CREATE VISIT BODY:", req.body);

    const visit = await Visit.create({
      patient: req.body.patient,   // ✅ FIXED (was patientId)
      symptoms: req.body.symptoms  // optional but useful
    });

    res.status(201).json(visit);
  } catch (err) {
    console.error("CREATE VISIT ERROR:", err);
    res.status(500).json({ message: "Failed to create visit" });
  }
};

// ✅ Upload MRI
export const uploadMRI = async (req, res) => {
  try {
    const { visitId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const visit = await Visit.findById(visitId);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    visit.mriPath = req.file.path;
    await visit.save();

    res.json({
      message: "MRI uploaded successfully",
      mriPath: visit.mriPath
    });
  } catch (err) {
    console.error("MRI UPLOAD ERROR:", err);
    res.status(500).json({ message: "MRI upload failed" });
  }
};