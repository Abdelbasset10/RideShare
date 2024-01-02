import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
          <React.StrictMode>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
               <ToastContainer
               position="top-right"
               autoClose={3000}
               limit={3}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
               />
                    <App />
               </LocalizationProvider>
          </React.StrictMode>
);