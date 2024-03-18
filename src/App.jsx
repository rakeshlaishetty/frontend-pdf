import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const globalStyles = {
    a: {
      color:"unset",
      textDecoration:"none"
    }
}
function App() {
  return (
    <>
    <CssBaseline/>
    <GlobalStyles styles={globalStyles} />
    <RouterProvider router={router} />
    </>
  );
}

export default App;
