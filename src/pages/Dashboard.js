import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
| Main admin overview page.
| Shows:
| - total projects
| - project statuses
| - project table
|--------------------------------------------------------------------------
*/

export default function Dashboard() {

  // Stores all projects fetched from backend
  const [projects, setProjects] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | FETCH PROJECTS
  |--------------------------------------------------------------------------
  | Runs once when page loads.
  |--------------------------------------------------------------------------
  */
  useEffect(() => {

    getProjects()
      .then((response) => {

        console.log("Projects fetched:", response.data);

        setProjects(response.data);

      })
      .catch((error) => {

        console.error("Error fetching projects:", error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  /*
  |--------------------------------------------------------------------------
  | CALCULATE STATS
  |--------------------------------------------------------------------------
  */

  const totalProjects = projects.length;

  const passedProjects = projects.filter(
    (project) => project.status === "passed"
  ).length;

  const flaggedProjects = projects.filter(
    (project) => project.status === "flagged_review"
  ).length;

  const mintedProjects = projects.filter(
    (project) => project.status === "credits_issued"
  ).length;

  /*
  |--------------------------------------------------------------------------
  | LOADING SCREEN
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  /*
  |--------------------------------------------------------------------------
  | MAIN UI
  |--------------------------------------------------------------------------
  */
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h1>Carbon Credit Admin Dashboard</h1>

      <p>
        Government MRV verification and fraud detection platform.
      </p>

      {/* ========================================================= */}
      {/* DASHBOARD STATS */}
      {/* ========================================================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >

        <div style={cardStyle}>
          <h3>Total Projects</h3>
          <p>{totalProjects}</p>
        </div>

        <div style={cardStyle}>
          <h3>Passed</h3>
          <p>{passedProjects}</p>
        </div>

        <div style={cardStyle}>
          <h3>Flagged</h3>
          <p>{flaggedProjects}</p>
        </div>

        <div style={cardStyle}>
          <h3>Minted</h3>
          <p>{mintedProjects}</p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* PROJECT TABLE */}
      {/* ========================================================= */}

      <h2>Projects</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >

        <thead>
          <tr>
            <th>Project ID</th>
            <th>Company Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (

            <tr key={project.project_id}>

              <td>{project.project_id}</td>

              <td>{project.company_name}</td>

              <td>{project.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SIMPLE CARD STYLE
|--------------------------------------------------------------------------
*/
const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "20px",
  width: "180px",
  textAlign: "center",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
};