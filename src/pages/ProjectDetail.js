import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectReport, mintProject } from "../api/api";
import axios from "axios";

export default function ProjectDetail() {

  const { id }              = useParams();
  const [report, setReport] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const fetchReport = () => {
    getProjectReport(id)
      .then(res => setReport(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (!report) return <h2>Loading project report...</h2>;

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await axios.post(`http://127.0.0.1:8000/projects/${id}/verify`);
      alert("Verification complete. Refreshing report...");
      fetchReport();
    } catch (error) {
      alert("Verification failed: " + (error.response?.data?.detail || error.message));
    } finally {
      setVerifying(false);
    }
  };

  const handleMint = async () => {
    try {
      const response = await mintProject(id);
      alert(`Mint successful!\n\nTX HASH:\n${response.data.tx_hash}`);
      fetchReport();
    } catch (error) {
      alert("Mint failed: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Project Detail</h2>
      <p><b>Company:</b> {report.company_name}</p>
      <p><b>Status:</b> {report.status}</p>
      <p><b>Area:</b> {report.area_hectares} hectares</p>

      <h3>Verification History</h3>

      {report.verifications.length === 0 ? (
        <p style={{ color: "#888" }}>No verifications yet.</p>
      ) : (
        report.verifications.map((v, i) => (
          <div key={i} style={{
            border: "1px solid #ccc", padding: "15px",
            marginBottom: "15px", borderRadius: "10px"
          }}>
            <p><b>Year:</b> {v.year}</p>
            <p><b>Decision:</b> {v.decision}</p>
            <p><b>Confidence:</b> {v.confidence_score}/100</p>
            <p><b>Active Credits:</b> {v.active_credits} tCO₂</p>
            <p><b>Buffer Credits:</b> {v.buffer_credits} tCO₂</p>
            <p><b>Tree Cover:</b> {v.tree_cover_pct}%</p>
            <p><b>NDVI:</b> {v.ndvi_current}</p>
            <p><b>TX Hash:</b>{" "}
              {v.tx_hash ? (
                <a href={`https://sepolia.etherscan.io/tx/${v.tx_hash}`}
                   target="_blank" rel="noreferrer">
                  {v.tx_hash.slice(0, 20)}... ↗
                </a>
              ) : "Not minted yet"}
            </p>
          </div>
        ))
      )}

      {/* Action buttons — shown based on current status */}
      <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>

        {/* Verify — only show if pending or passed but not yet credits_issued */}
        {["pending", "passed", "failed"].includes(report.status) && (
          <button
            onClick={handleVerify}
            disabled={verifying}
            style={{
              padding: "12px 20px", backgroundColor: "#16a34a",
              color: "white", border: "none", borderRadius: "8px",
              cursor: verifying ? "not-allowed" : "pointer",
              opacity: verifying ? 0.6 : 1
            }}
          >
            {verifying ? "Verifying... (5-10 min)" : "Run Verification"}
          </button>
        )}

        {/* Mint — only show if passed and not yet minted */}
        {report.status === "passed" && (
          <button
            onClick={handleMint}
            style={{
              padding: "12px 20px", backgroundColor: "#2563eb",
              color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Mint Credits
          </button>
        )}

        {report.status === "flagged_review" && (
          <div style={{
            padding: "12px 20px", background: "#fff3cd",
            border: "1px solid #ffc107", borderRadius: "8px", color: "#856404"
          }}>
            ⚠️ Flagged for review — credits held in escrow until cleared
          </div>
        )}

        {report.status === "credits_issued" && (
          <div style={{
            padding: "12px 20px", background: "#d4edda",
            border: "1px solid #c3e6cb", borderRadius: "8px", color: "#155724"
          }}>
            ✅ Credits issued and on blockchain
          </div>
        )}

      </div>

    </div>
  );
}