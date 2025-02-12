import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableComponent from "../../components/TableComponent";
import FormModal from "../../components/FormModal";

const ManageDiagnoses = () => {
    const [diagnoses, setDiagnoses] = useState([
        { id: 1, name: "Hypertension", description: "High blood pressure", severity: "Moderate" },
        { id: 2, name: "Diabetes", description: "High blood sugar levels", severity: "Severe" },
    ]);

    const diagnosesColumns = [
        { key: "name", label: "Diagnosis Name" },
        { key: "description", label: "Description" },
        { key: "severity", label: "Severity Level" },
    ];

    const [showModal, setShowModal] = useState(false);
    const [currentDiagnosis, setCurrentDiagnosis] = useState(null);

    const handleAdd = () => {
        setCurrentDiagnosis(null);
        setShowModal(true);
    };

    const handleEdit = (diagnosis) => {
        setCurrentDiagnosis(diagnosis);
        setShowModal(true);
    };

    const handleSave = (diagnosis) => {
        if (diagnosis.id) {
            setDiagnoses(diagnoses.map((diag) => (diag.id === diagnosis.id ? diagnosis : diag)));
        } else {
            setDiagnoses([...diagnoses, { ...diagnosis, id: diagnoses.length + 1 }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this diagnosis?")) {
            setDiagnoses(diagnoses.filter((diag) => diag.id !== id));
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header username="Admin" />
            <div className="d-flex flex-grow-1">
                <Sidebar role="admin" />
                <div className="container-fluid p-4 flex-grow-1">
                    <TableComponent
                        title="Diagnoses"
                        columns={diagnosesColumns}
                        data={diagnoses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAdd={handleAdd}
                    />
                    {showModal && (
                        <FormModal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            onSave={handleSave}
                            title={currentDiagnosis ? "Edit Diagnosis" : "Add Diagnosis"}
                            fields={diagnosesColumns}
                            initialData={currentDiagnosis || {}}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManageDiagnoses;
