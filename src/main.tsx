import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/global.css";

console.log("MAIN ENTRY LOADED ✅");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
