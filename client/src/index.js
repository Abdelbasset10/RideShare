import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
          <LocalizationProvider dateAdapter={AdapterDayjs}>
               <App />
          </LocalizationProvider>
);