import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, Suspense } from "react";
import Sidebar from "../common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import Profile from "../common/Profile";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/slices/navSlice";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";


const Root = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  padding: 5,
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(4),
  },
}));

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
  }, [userData?.token, navigate]);

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
                height: "100%",
                padding: 1,
                flex: 1,
              }}
            >
              <Box sx={{ height: "100%", minHeight: "100%" }}>
                <Root>
                  <Box
                    component="section"
                    sx={{ p: 2, minHeight: "100%" }}
                  >
                    <Outlet />
                  </Box>
                </Root>
              </Box>
            </Paper>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
