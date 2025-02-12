import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import ManageEmployees from "./pages/Admin/ManageEmployee"; // ✅ Fixed Import
import ManageDoctors from "./pages/Admin/ManageDoctor"; // ✅ Fixed Import
import ManageDiagnoses from "./pages/Admin/ManageDiagnoses";
import ManageMedicines from "./pages/Admin/ManageMedicines";
import PatientDashboard from "./pages/Patient/PatientDashboard"; // ✅ Added Import
import ProtectedRoute from "./utils/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/employees"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageEmployees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/doctors"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageDoctors />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/medicines"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageMedicines />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/diagnoses"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageDiagnoses />
                        </ProtectedRoute>
                    }
                />

                {/* Doctor Routes */}
                <Route
                    path="/doctor/dashboard"
                    element={
                        <ProtectedRoute role="doctor">
                            <DoctorDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Patient Routes */}
                <Route
                    path="/patient/dashboard"
                    element={
                        <ProtectedRoute role="patient">
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-All Route */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
