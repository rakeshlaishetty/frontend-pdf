import React from "react";
import { Navigate } from "react-router-dom";
import Projects from "../pages/Admin/Pages/Projects/Projects"
const CreateProfile = React.lazy(() => import("../pages/Admin/Pages/Profile/CreateProfile"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound/NotFound"));
const ViewProfile = React.lazy(() => import("../pages/Admin/Pages/Profile/ViewProfile"));
const CreateProject = React.lazy(() => import("../pages/Admin/Pages/Projects/CreateProjects"));
const ProjectDocuments = React.lazy(()=> import("../pages/Admin/Pages/Projects/ProjectDocuments"))
const DocumentsList = React.lazy(()=> import("../pages/Admin/Pages/Documents/DocumentsList"))
const CreateDocument = React.lazy(() => import("../pages/Admin/Pages/Documents/CreateDocument"));


export const adminChildrens = [
  { path: "dashboard", element: <Dashboard />, index: true },
  { path: "projects", element: <Projects /> },
  { path: "projects/createproject", element: <CreateProject /> }, // Add the child route for creating a project
  { path: "projects/documents/:id", element: <ProjectDocuments /> }, // Add the child route for creating a project
  { path: "documents", element: <DocumentsList /> },
  { path: "documents/createdoucment", element: <CreateDocument /> }, // Add the child route for creating a project
  { path: "*", element: <NotFoundPage /> },
  { path: "", element: <Navigate to={"dashboard"} /> },
  { path: "createprofile", element: <CreateProfile /> },
  { path: "profile", element: <ViewProfile /> },
];
