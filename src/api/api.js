import axios from "axios";

/*
|--------------------------------------------------------------------------
| API CONFIGURATION
|--------------------------------------------------------------------------
| This file handles all frontend → backend communication.
|--------------------------------------------------------------------------
*/

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/*
|--------------------------------------------------------------------------
| GET ALL PROJECTS
|--------------------------------------------------------------------------
| Fetches all projects for admin dashboard.
|--------------------------------------------------------------------------
*/
export const getProjects = () => API.get("/projects/");

/*
|--------------------------------------------------------------------------
| GET FULL PROJECT REPORT
|--------------------------------------------------------------------------
*/
export const getProjectReport = (projectId) =>
  API.get(`/projects/${projectId}/report`);

/*
|--------------------------------------------------------------------------
| MINT CREDITS
|--------------------------------------------------------------------------
*/
export const mintProject = (projectId) =>
  API.post(`/projects/${projectId}/mint`);

export default API;