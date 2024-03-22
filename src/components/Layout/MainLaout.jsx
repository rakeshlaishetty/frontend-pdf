import { Box, Paper,Backdrop,CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect, useState, Suspense } from "react";
import Sidebar from "../common/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import Profile from "../common/Profile";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/slices/navSlice";
import { useSelector } from "react-redux";


const OverlaySpinner = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
    <LinearProgress /> 
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const TopbarHeight = 70;

const MainLayout = () => {
  const navigate = useNavigate();
  const navState = useSelector((state) => {
    return state.navbar;
  });
  const userData = useSelector((state) => {
    return state.userData;
  });

  useEffect(() => {
    if (!userData.token) {
      navigate("/login", { replace: true });
    }
  }, [userData?.token]); 

  const dispatch = useDispatch();

  const ChangeSidebar = () => {
    dispatch(toggle());
  };

  return (
    <Box display={"flex"} flexDirection="column" height="100vh">
      {/* Sidebar and Main Content */}
      <Box display="flex" flexGrow={1}>
        {/* Sidebar */}
        <Paper
          sx={{
            bgcolor: "primary.secondary",
          }}
        >
          <Sidebar SidebarWidth={navState.isOpen ? 350 : 0} />
        </Paper>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Top Bar */}
          <Paper
            sx={{
              bgcolor: "primary.secondary",
              color: "black",
              p: 3,
              height: `${TopbarHeight}px`,
              width: `100%`,
              mb: 0.3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ margin: "2px", cursor: "pointer", display: "flex" }}>
              <FaBarsStaggered size={24} onClick={ChangeSidebar} />
            </Box>
            <Box>
              <Profile />
            </Box>
          </Paper>
          <Suspense fallback={<OverlaySpinner />}>
          <Paper
            sx={{
              bgcolor: "primary.secondary",
              color: "black",
              width: `100%`,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height:'auto',
              flex:1
            }}
          ><Box>
              <Outlet />
            </Box>
              </Paper>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
