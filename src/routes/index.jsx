import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import AppLayout from "../components/Layout/AppLayout";
import MainLayout from "../components/Layout/MainLaout";
import { useSelector } from "react-redux";
import ROLES from "../utils/roles";

// Lazy-loaded components
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound/NotFound"));

const analystChildrens = [{ path: 'dashboard', element: <Dashboard />, index: true },{ path: '*', element: <Navigate to={'dashboard'} />}];
const adminChildrens = [{ path: 'dashboard', element: <Dashboard /> }, { path: 'projects', element: <Dashboard /> },{ path: '*', element: <Navigate to={'dashboard'} />}];
const clientChildrens = [{ path: 'dashboard', element: <Dashboard />, index: true },{ path: '*', element: <Navigate to={'dashboard'} />}];
const employeeChildrens = [{ path: 'dashboard', element: <Dashboard />, index: true },{ path: '*', element: <Navigate to={'dashboard'} />}];

const RoleBasedPages = {
    [ROLES.analyst]: { path: 'analyst', element: <MainLayout />, children: analystChildrens },
    [ROLES.admin]: { path: 'admin', element: <MainLayout />,   children: adminChildrens },
    [ROLES.client]: { path: 'client', element: <MainLayout />, children: clientChildrens },
    [ROLES.employee]: { path: 'employee', element: <MainLayout />, children: employeeChildrens }
};

const RoutesConfig = () => {
    const userData = useSelector((state) => state.userData);
    const roleName = userData?.user?.role?.roleName;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Clean up timeout
        return () => clearTimeout(timeout);
    }, []);

    // Get the corresponding role based pages for the user's role
    const rolePages = roleName ? RoleBasedPages[roleName] : null;

    return (
        <React.Suspense fallback={<LinearProgress />}>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <Routes>
                    <Route path="/login" element={<AppLayout />}>
                        <Route index element={<LoginPage />} />
                    </Route>
                    {rolePages && (
                        <Route path={rolePages.path} element={rolePages.element}>
                            {rolePages.children.map((child, index) => (
                                <Route key={index} path={`${child.path}`} element={child.element} />
                            ))}
                        </Route>
                    )}
                    <Route path="*" element={<Navigate to={"login"} />} />
                </Routes>
            )}
        </React.Suspense>
    );
};

export default RoutesConfig;
