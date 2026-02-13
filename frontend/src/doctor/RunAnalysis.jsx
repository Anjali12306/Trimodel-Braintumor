import api from "../api/api";
import { useParams } from "react-router-dom";

export default function RunAnalysis() {
  const { id } = useParams();

  const run = async () => {
    await api.post(`/doctor/patient/${id}/run-analysis`);
    alert("Analysis started");
  };

  return <button onClick={run}>Run AI Analysis</button>;
}
