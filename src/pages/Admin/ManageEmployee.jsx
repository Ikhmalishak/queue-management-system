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
        //{ key: "company", label: "Company" },
    ];

    const employeeFields = employeeColumns.map((col) => ({
        name: col.key, 
        label: col.label,
        type: "text", // Default type
    }));
    
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

    const fetchEmployees = async () => {
        try {
            const response = await api.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("❌ Error fetching employees:", error);
        }
    };    

    const handleSave = async (employee) => {
        try {
            let updatedEmployee = { ...employee };
    
            console.log("Current Employee:", currentEmployee);
    
            if (currentEmployee && currentEmployee.employee_id) {
                // ✅ Ensure the ID is retained
                updatedEmployee = { ...employee, employee_id: currentEmployee.employee_id };
    
                // ✅ Update existing employee (PUT request)
                await api.put(`/employees/${currentEmployee.id}`, updatedEmployee);
                setEmployees((prev) =>
                    prev.map((emp) =>
                        emp.employee_id === currentEmployee.employee_id ? updatedEmployee : emp
                    )
                );

            // ✅ Show success message
            alert("✅ Employee updated successfully!");
            
            } else {
                // ✅ Add new employee (POST request)
                const response = await api.post("/employees", employee);
                setEmployees((prev) => [...prev, response.data]);
            }
    
            setShowModal(false);
        } catch (error) {
            if (error.response) {
                // ✅ Handle validation errors from Laravel (422 status)
                if (error.response.status === 422) {
                    console.error("❌ Validation Errors:", error.response.data.errors);
                    alert("Validation Error:\n" + JSON.stringify(error.response.data.errors, null, 2));
                } else {
                    console.error("❌ API Error:", error.response.data);
                    alert("Error: " + error.response.data.message);
                }
            } else {
                console.error("❌ Network or Server Error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
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

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("No file selected!");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        console.log("Uploading file:", file.name);
        
        try {
            const response = await api.post("/employees/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            console.log("Upload Response:", response);
            
            if (response.status === 200 || response.status === 201) {
                alert("✅ File uploaded successfully!");
                fetchEmployees(); // Refresh the employee list
            } else {
                alert("⚠️ Upload failed: Unexpected response.");
            }
        } catch (error) {
            console.error("❌ Upload Error:", error.response?.data || error);
            
            if (error.response) {
                alert("❌ Upload failed: " + JSON.stringify(error.response.data.errors || error.response.data.message, null, 2));
            } else {
                alert("❌ Network error! Please check your connection.");
            }
        }
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
                            fields={employeeFields}
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
