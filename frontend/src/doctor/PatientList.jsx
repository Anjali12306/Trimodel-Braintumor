import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/patients/doctor") // ✅ correct API
      .then(res => setPatients(res.data))
      .catch(() => console.log("Failed to load patients"));
  }, []);

  return (
    <div>
      <h3>My Patients</h3>

      {patients.length === 0 && <p>No patients assigned</p>}

      {patients.map(p => (
        <div key={p._id}>
          {p.name}
          <button onClick={() => navigate(`/doctor/patient/${p._id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}
