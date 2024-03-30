import React, { useState } from "react";
import { CssBaseline, GlobalStyles, LinearProgress, Button,Backdrop,CircularProgress } from "@mui/material";
import { RouterProvider,BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import "sweetalert2/dist/sweetalert2.min.css";
// import CustomToast from "./utils/CustomToast";
import { useSelector } from "react-redux";
import CustomToast from "./utils/CustomToast";

const globalStyles = {
  a: {
    color: "unset",
    textDecoration: "none",
  },
};

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong : </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

export const OverlaySpinner = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

function App() {
  const toastData = useSelector((state) => state.toastdata);

  // Listen to route change events and update loading state
 

  return (
    <>
      {toastData.boolean ? <CustomToast title={toastData?.message || "" } icon={toastData?.icon || "info"} /> : null }
      <React.Suspense fallback={<OverlaySpinner />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <BrowserRouter>
             <RoutesConfig />
          </BrowserRouter>
        </ErrorBoundary>
      </React.Suspense>
    </>
  );
}

export default App;
