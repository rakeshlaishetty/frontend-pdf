import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout"
import MainLayout from "../components/Layout/MainLaout"
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard"


export const router = createBrowserRouter([
    {
        path:'/',
        element: <AppLayout/>,
        children: [
            {
                index:true,
                element:<LoginPage />
            },
            {
                path:'dashboard',
                element:<MainLayout />,
                children:[
                    {
                        index:true,
                        element:<Dashboard />
                    }
                ]
            }
        ]
    }
]) 