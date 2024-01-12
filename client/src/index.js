import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);
