import Patient from "../models/Patient.js";

// Receptionist → add patient
export const addPatient = async (req, res) => {
  const { name, age, gender, assignedDoctor } = req.body;

  const patient = await Patient.create({
    name,
    age,
    gender,
    assignedDoctor
  });

  res.json(patient);
};

// Doctor → get assigned patients
export const getDoctorPatients = async (req, res) => {
  const patients = await Patient.find({
    assignedDoctor: req.user.id
  });

  res.json(patients);
};
