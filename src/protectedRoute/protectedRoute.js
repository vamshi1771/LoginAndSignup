import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userId);
    console.log(user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;