import React, { useState, useEffect } from "react";
import { api, setAuthToken } from '../../utils/api';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableComponent from "../../components/TableComponent";
import FormModal from "../../components/FormModal";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const doctorFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true
    },
    {
      name: "phone_number",
      label: "Phone",
      type: "tel",
      required: true
    }
  ];

  const doctorColumns = doctorFields.map(field => ({
    key: field.name,
    label: field.label
  }));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    } else {
      console.error("No auth token found! Redirecting to login...");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        if (error.response?.status === 401) {
          alert("Session expired! Please log in again.");
          localStorage.removeItem("authToken");
          window.location.href = "/";
        }
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // First, move fetchDoctors outside useEffect so we can reuse it
  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      if (error.response?.status === 401) {
        alert("Session expired! Please log in again.");
        localStorage.removeItem("authToken");
        window.location.href = "/";
      }
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentDoctor(null);
    setShowModal(true);
  };

  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    try {
      if (!formData.name || !formData.email || !formData.phone_number) {
        alert("Please fill in all required fields");
        return;
      }

      const doctorData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number
      };

      if (currentDoctor?.id) {
        const response = await api.put(`/doctors/${currentDoctor.id}`, doctorData);
        setDoctors(prev =>
          prev.map(doc => doc.id === currentDoctor.id ? response.data : doc)
        );
        alert("Doctor updated successfully!");
      } else {
        const response = await api.post("/doctors", doctorData);
        setDoctors(prev => [...prev, response.data]);
        fetchDoctors();
        alert("Doctor added successfully!");
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving doctor:", error);
      if (error.response?.data) {
        alert(`Error: ${error.response.data.message || JSON.stringify(error.response.data.errors)}`);
      } else {
        alert("Network error! Please check your connection.");
      }
    }
  };

  // ✅ Delete an employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/doctors/${id}`);
        setDoctors((prev) => prev.filter((emp) => emp.id !== id));
      } catch (error) {
        console.error("❌ Error deleting doctor:", error);
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
            <p>Loading doctors...</p>
          ) : (
            <TableComponent
              title="Doctors"
              columns={doctorColumns}
              data={doctors}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          )}
          {showModal && (
            <FormModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSave}
              title={currentDoctor ? "Edit Doctor" : "Add Doctor"}
              fields={doctorFields}
              initialData={currentDoctor || {}}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageDoctors;