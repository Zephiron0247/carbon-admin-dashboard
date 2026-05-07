import React from "react";
import { Link } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| SIDEBAR COMPONENT
|--------------------------------------------------------------------------
| Left-side navigation menu.
|--------------------------------------------------------------------------
*/

export default function Sidebar() {

  return (

    <div
      style={{
        width: "220px",
        backgroundColor: "#f3f4f6",
        height: "100vh",
        padding: "20px",
      }}
    >

      <h3>Navigation</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>

        <li style={{ marginBottom: "15px" }}>
          <Link to="/">Dashboard</Link>
        </li>

        <li style={{ marginBottom: "15px" }}>
          <Link to="/projects">Projects</Link>
        </li>

        <li style={{ marginBottom: "15px" }}>
          <Link to="/flagged">Flagged Projects</Link>
        </li>

      </ul>

    </div>

  );
}