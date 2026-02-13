import { useEffect, useState } from "react";
import api from "../api/api";

export default function RegisterPatient() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch doctors from YOUR backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/patients/doctors"); // ✅ CORRECT
        setDoctors(res.data);
      } catch (err) {
        setMessage("❌ Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    if (!name || !age || !gender || !phone || !assignedDoctor) {
      setMessage("❌ All fields are required");
      return;
    }

    try {
      await api.post("/patients", {
        name,
        age,
        gender,
        phone,
        assignedDoctor,
      });

      setMessage("✅ Patient registered successfully");

      // clear form
      setName("");
      setAge("");
      setGender("");
      setPhone("");
      setAssignedDoctor("");
    } catch (err) {
      setMessage("❌ Error registering patient");
    }
  };

  return (
    <div>
      <h3>Register Patient</h3>

      {message && <p>{message}</p>}

      <input
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        value={assignedDoctor}
        onChange={(e) => setAssignedDoctor(e.target.value)}
      >
        <option value="">Select Doctor</option>
        {doctors.map((doc) => (
          <option key={doc._id} value={doc._id}>
            {doc.email}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Register Patient</button>
    </div>
  );
}
