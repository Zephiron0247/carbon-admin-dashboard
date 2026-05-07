import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import FlaggedProjects from "./pages/FlaggedProjects";

/*
|--------------------------------------------------------------------------
| MAIN APPLICATION
|--------------------------------------------------------------------------
*/

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/projects" element={<Projects />} />

            <Route
              path="/project/:id"
              element={<ProjectDetail />}
            />

            <Route
              path="/flagged"
              element={<FlaggedProjects />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );
}

export default App;