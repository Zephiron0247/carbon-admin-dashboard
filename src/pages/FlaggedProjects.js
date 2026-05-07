import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";

/*
|--------------------------------------------------------------------------
| FLAGGED PROJECTS PAGE
|--------------------------------------------------------------------------
*/

export default function FlaggedProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    getProjects()
      .then((response) => {

        const flagged = response.data.filter(
          (project) => project.status === "flagged_review"
        );

        setProjects(flagged);

      });

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>Flagged Projects</h2>

      {projects.length === 0 ? (

        <p>No flagged projects found.</p>

      ) : (

        projects.map((project) => (

          <div
            key={project.project_id}
            style={{
              border: "1px solid red",
              padding: "15px",
              marginBottom: "10px",
            }}
          >

            <p><b>Company:</b> {project.company_name}</p>

            <p><b>Status:</b> {project.status}</p>

          </div>

        ))

      )}

    </div>

  );
}