import React, { useState, useEffect } from "react";
import { api, setAuthToken } from '../../utils/api'; // ✅ Import `setAuthToken`
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableComponent from "../../components/TableComponent";
import FormModal from "../../components/FormModal";

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    // ✅ Ensure auth token is set on component mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token); // ✅ Ensures API requests include token
        } else {
            console.error("❌ No auth token found! Redirecting to login...");
            window.location.href = "/";
        }
    }, []);

    // ✅ Fetch employees from API on page load
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get("/employees"); // ✅ No need for full URL
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                console.error("❌ Error fetching employees:", error);
                if (error.response?.status === 401) {
                    alert("Session expired! Please log in again.");
                    localStorage.removeItem("authToken");
                    window.location.href = "/";
                }
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // ✅ Define column headers dynamically
    const employeeColumns = [
        { key: "employee_id", label: "Employee ID" },
        { key: "name", label: "Name" },
        { key: "department", label: "Department" },
        { key: "race", label: "Race" },
        { key: "nric_number", label: "Nric Number" },
        { key: "passport_number", label: "Passport Number" },
        { key: "nationatility", label: "Nationality" },
        { key: "base", label: "Base" },
        { key: "company", label: "Company" },
    ];

    // ✅ Open modal for adding a new employee
    const handleAdd = () => {
        setCurrentEmployee(null);
        setShowModal(true);
    };

    // ✅ Open modal for editing an existing employee
    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setShowModal(true);
    };

    // ✅ Save new or updated employee
    const handleSave = async (employee) => {
        try {
            if (employee.id) {
                // ✅ Update existing employee
                await api.put(`/employees/${employee.id}`, employee);
                setEmployees((prev) => prev.map((emp) => (emp.id === employee.id ? employee : emp)));
            } else {
                // ✅ Add new employee
                const response = await api.post("/employees", employee);
                setEmployees((prev) => [...prev, response.data]);
            }
            setShowModal(false);
        } catch (error) {
            console.error("❌ Error saving employee:", error);
        }
    };

    // ✅ Delete an employee
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees((prev) => prev.filter((emp) => emp.id !== id));
            } catch (error) {
                console.error("❌ Error deleting employee:", error);
            }
        }
    };

    // ✅ Dummy Import Function (Implement Later)
    const handleImport = () => {
        alert("📂 Import from Excel feature coming soon!");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header username="Admin" />
            <div className="d-flex flex-grow-1">
                <Sidebar role="admin" />
                <div className="container-fluid p-4 flex-grow-1">
                    {loading ? (
                        <p>Loading employees...</p>
                    ) : (
                        <TableComponent
                            title="Employees"
                            columns={employeeColumns}
                            data={employees}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAdd={handleAdd}
                            onImport={handleImport}
                        />
                    )}
                    {showModal && (
                        <FormModal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            onSave={handleSave}
                            title={currentEmployee ? "Edit Employee" : "Add Employee"}
                            fields={employeeColumns}
                            initialData={currentEmployee || {}}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManageEmployees;
