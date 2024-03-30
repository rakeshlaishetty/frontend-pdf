
import React from "react";
import {  Navigate } from "react-router-dom";



const NotFoundPage = React.lazy(() => import("../pages/NotFound/NotFound"));

export  const clientChildrens = [
    // { path: "dashboard", element: <Dashboard />, index: true },
    { path: "*", element: <NotFoundPage /> },
    { path: "", element: <Navigate to={"dashboard"} /> },
  ];