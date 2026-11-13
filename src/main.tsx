import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./editorial.css";
import "./redesign.css";
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const root = document.getElementById("root")!;
if (root.hasChildNodes() && !location.hash.startsWith("#/") && !location.search)
  hydrateRoot(root, app);
else createRoot(root).render(app);
