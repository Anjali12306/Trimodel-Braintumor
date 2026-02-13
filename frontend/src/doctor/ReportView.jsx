import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

export default function ReportView() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get(`/doctor/patient/${id}/report`).then(res => setReport(res.data));
  }, []);

  if (!report) return <p>Loading...</p>;

  return (
    <div>
      <h3>{report.tumor_type}</h3>
      <p>Confidence: {report.confidence}</p>
      <img src={report.explainability_url} width="300" />
    </div>
  );
}
