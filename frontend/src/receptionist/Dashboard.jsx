import { useState } from "react";
import api from "../api/api";

export default function UploadMRI() {
  const [visitId, setVisitId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!visitId || !file) {
      setMessage("❌ Visit ID and MRI file required");
      return;
    }

    const formData = new FormData();
    formData.append("mri", file);

    try {
      await api.post(`/visits/${visitId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ MRI uploaded successfully");
      setVisitId("");
      setFile(null);
    } catch (err) {
      setMessage("❌ MRI upload failed");
    }
  };

  return (
    <div>
      <h3>Upload MRI</h3>

      {message && <p>{message}</p>}

      <input
        placeholder="Visit ID"
        value={visitId}
        onChange={(e) => setVisitId(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* ✅ THIS BUTTON WAS MISSING */}
      <button onClick={handleUpload}>
        Upload MRI
      </button>
    </div>
  );
}
