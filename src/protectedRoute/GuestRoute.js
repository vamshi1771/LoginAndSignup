
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const user = useSelector((state) => state.user.userId);
    return user === "" ? children :  <Navigate to="/" /> ;
};

export default GuestRoute;