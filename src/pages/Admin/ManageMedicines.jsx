import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableComponent from "../../components/TableComponent";
import FormModal from "../../components/FormModal"

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", category: "Painkiller", dosage: "500mg", stock: 100 },
    { id: 2, name: "Ibuprofen", category: "Anti-inflammatory", dosage: "200mg", stock: 50 },
  ]);

  const medicineColumns = [
    { key: "name", label: "Medicine Name" },
    { key: "category", label: "Category" },
    { key: "dosage", label: "Dosage" },
    { key: "stock", label: "Stock" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  const handleAdd = () => {
    setCurrentMedicine(null);
    setShowModal(true);
  };

  const handleEdit = (medicine) => {
    setCurrentMedicine(medicine);
    setShowModal(true);
  };

  const handleSave = (medicine) => {
    if (medicine.id) {
      setMedicines(medicines.map((med) => (med.id === medicine.id ? medicine : med)));
    } else {
      setMedicines([...medicines, { ...medicine, id: medicines.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter((med) => med.id !== id));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header username="Admin" />
      <div className="d-flex flex-grow-1">
        <Sidebar role="admin" />
        <div className="container-fluid p-4 flex-grow-1">
          <TableComponent
            title="Medicines"
            columns={medicineColumns}
            data={medicines}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
          {showModal && (
            <FormModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSave}
              title={currentMedicine ? "Edit Medicine" : "Add Medicine"}
              fields={medicineColumns}
              initialData={currentMedicine || {}}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageMedicines;
