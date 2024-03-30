
import React from "react";
import {  Navigate } from "react-router-dom";

const CreateProfile = React.lazy(() => import("../pages/Admin/CreateProfile"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound/NotFound"));

export const adminChildrens = [
    { path: "dashboard", element: <Dashboard />, index: true },
    { path: "projects", element: <Dashboard /> },
    { path: "*", element: <NotFoundPage /> },
    { path: "", element: <Navigate to={"dashboard"} /> },
    { path: "createprofile", element: <CreateProfile /> },
  ];
  