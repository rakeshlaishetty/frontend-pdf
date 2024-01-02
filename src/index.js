import "./style.css";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <HashRouter basename="/">
    <App />
  </HashRouter>
);
