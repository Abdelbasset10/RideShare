import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import App from "./App";
import { AuthContext } from "./contexts/AuthContext";
import { CookiesProvider } from "react-cookie";
import { useAuth } from "./hooks/auth/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
     <App />
  </React.StrictMode>
);
