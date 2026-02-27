import { useEffect, useState } from "react";
import api from "../api/api";

export default function CreateVisit() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [message, setMessage] = useState("");

  // Load all patients for receptionist
  useEffect(() => {
    api
      .get("/patients") // receptionist can see all patients
      .then((res) => setPatients(res.data))
      .catch(() => setMessage("❌ Failed to load patients"));
  }, []);

  const createVisit = async () => {
    if (!selectedPatient) {
      setMessage("❌ Please select a patient");
      return;
    }

    try {
      await api.post("/visits", {
        patientId: selectedPatient,
      });

      setMessage("✅ Visit created successfully");
      setSelectedPatient("");
    } catch (err) {
      setMessage("❌ Failed to create visit");
    }
  };

  return (
    <div>
      <h3>Create Visit</h3>

      {message && <p>{message}</p>}

      <select
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={createVisit}>Create Visit</button>
    </div>
  );
}