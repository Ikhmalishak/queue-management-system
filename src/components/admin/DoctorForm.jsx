import React, { useState, useEffect } from "react";

const DoctorForm = ({ doctor, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    } else {
      setFormData({ name: "", specialization: "", email: "", phone: "" });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{doctor ? "Edit Doctor" : "Add Doctor"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input type="text" className="form-control" name="specialization" value={formData.specialization} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">{doctor ? "Save Changes" : "Add Doctor"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
