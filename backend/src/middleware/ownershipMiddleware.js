import Patient from "../models/Patient.js";

const ownershipMiddleware = async (req, res, next) => {
  const patient = await Patient.findById(req.params.patientId);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  if (patient.assignedDoctor.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not your patient" });
  }

  next();
};

export default ownershipMiddleware;
