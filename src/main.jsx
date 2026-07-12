import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MasterMechanic from "../MasterMechanic.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MasterMechanic />
  </StrictMode>,
);
