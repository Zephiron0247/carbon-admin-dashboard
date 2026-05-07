import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";
import { Link } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| PROJECTS PAGE
|--------------------------------------------------------------------------
| Shows all projects in table format.
|--------------------------------------------------------------------------
*/

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    getProjects()
      .then((response) => {

        setProjects(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>All Projects</h2>

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
            <th>Company</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (

            <tr key={project.project_id}>

              <td>{project.project_id}</td>

              <td>{project.company_name}</td>

              <td>{project.status}</td>

              <td>
                <Link to={`/project/${project.project_id}`}>
                  Open
                </Link>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}