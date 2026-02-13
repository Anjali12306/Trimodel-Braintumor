import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function PatientHistory() {
  const { patientId } = useParams();
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    api
      .get(`/visits/patient/${patientId}`)
      .then(res => setVisits(res.data))
      .catch(() => console.log("Failed to load visits"));
  }, [patientId]);

  return (
    <div>
      <h3>Patient Visit History</h3>

      {visits.length === 0 && <p>No visits found</p>}

      {visits.map(v => (
        <div
          key={v._id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p>
            <b>Date:</b>{" "}
            {new Date(v.createdAt).toLocaleDateString()}
          </p>

          {v.mriPath ? (
            <a
              href={`http://localhost:5000/${v.mriPath}`}
              target="_blank"
              rel="noreferrer"
            >
              View MRI
            </a>
          ) : (
            <p>No MRI uploaded</p>
          )}
        </div>
      ))}
    </div>
  );
}
