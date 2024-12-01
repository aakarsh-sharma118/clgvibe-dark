import React from "react";
import "./styles/base.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/clgvibe-dark">
      <App />
    </Router>
  </React.StrictMode>
);
