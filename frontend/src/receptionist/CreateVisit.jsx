import { useState } from "react";
import api from "../api/api";

export default function CreateVisit() {
  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");

  const createVisit = async () => {
    if (!patientId) {
      setMessage("❌ Patient ID required");
      return;
    }

    try {
      await api.post("/visits", { patientId }); // ✅ CORRECT
      setMessage("✅ Visit created successfully");
      setPatientId("");
    } catch (err) {
      setMessage("❌ Failed to create visit");
    }
  };

  return (
    <div>
      <h3>Create Visit</h3>

      {message && <p>{message}</p>}

      <input
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <button onClick={createVisit}>Create</button>
    </div>
  );
}
