import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Timer from "./Timer";
import Tasks from "./Task";
import Logo from './assets/logo_with_text.svg?react'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id="logo">
      <Logo/>
    </div>
    <div className="center">
      <Timer />
      <Tasks />
    </div>
  </StrictMode>
);
