import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    useEffect(() => {
        setToken(localStorage.getItem("authToken"));
        setUserRole(localStorage.getItem("userRole"));
    }, []);

    console.log("ProtectedRoute Running");
    console.log("Token:", token);
    console.log("User Role:", userRole);
    console.log("Expected Role:", role);

    if (!token) {
        console.warn("No token found, redirecting to login...");
        return <Navigate to="/" />;
    }

    if (role !== userRole) {
        console.warn(`Access denied: Expected ${role}, got ${userRole}`);
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
