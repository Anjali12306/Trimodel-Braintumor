import Visit from "../models/Visit.js";

// Create visit
export const createVisit = async (req, res) => {
  try {
    const visit = await Visit.create({
      patient: req.body.patientId,
    });

    res.json(visit);
  } catch (err) {
    res.status(500).json({ message: "Failed to create visit" });
  }
};

// ✅ Upload MRI (THIS WAS MISSING)
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

    res.json({ message: "MRI uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "MRI upload failed" });
  }
};
