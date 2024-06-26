import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

window.__APP__ = {
  version: "04-15-20:00-v1",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
