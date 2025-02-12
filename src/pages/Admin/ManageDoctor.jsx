import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableComponent from "../../components/TableComponent";
import FormModal from "../../components/FormModal"

const ManageDoctors = () => {
  const username = "Admin";

  const [doctors, setDoctors] = useState([
    { id: 1, name: "John Doe", role: "Doctor", email: "john@example.com", phone: "012-3456789" },
    { id: 2, name: "Jane Smith", role: "Nurse", email: "jane@example.com", phone: "011-2233445" },
    { id: 3, name: "Michael Lee", role: "Receptionist", email: "michael@example.com", phone: "019-8765432" },
  ]);

  const doctorColumns = [
    { key: "name", label: "Name" },
    { key: "specialization", label: "Specialization" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // Open Modal to Add New Doctor
  const handleAdd = () => {
    setCurrentDoctor(null); // New entry
    setShowModal(true);
  };

  // Open Modal to Edit Doctor
  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setShowModal(true);
  };

  // Handle Form Submission
  const handleSave = (doctor) => {
    if (doctor.id) {
      // Update existing doctor
      setDoctors(doctors.map((doc) => (doc.id === doctor.id ? doctor : doc)));
    } else {
      // Add new doctor
      setDoctors([...doctors, { ...doctor, id: doctors.length + 1 }]);
    }
    setShowModal(false);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header username="Admin" />
      <div className="d-flex flex-grow-1">
        <Sidebar role="admin" />
        <div className="container-fluid p-4 flex-grow-1">
          <TableComponent
            title="Doctors"
            columns={doctorColumns}
            data={doctors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
          {showModal && (
            <FormModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSave}
              title={currentDoctor ? "Edit Doctor" : "Add Doctor"}
              fields={doctorColumns}
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