import React from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import { errorToast } from "../utils/helpers.ts";

const ProtectedRoute = ({ isAllowed, redirectPath = "/landing", children }) => {
  if (!isAllowed) {
    errorToast("You are not allowed to access this page");
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
