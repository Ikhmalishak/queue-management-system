import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FormModal = ({ show, onClose, onSave, title, fields, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }), {}));
  }, [initialData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};


  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field, index) => (
            <Form.Group key={field.name || `field-${index}`} className="mb-3">
              <Form.Label>{field.label}</Form.Label>

              {/* ✅ Render radio buttons if options exist */}
              {field.options ? (
                <div>
                  {field.options.map((option, idx) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      label={option.label}
                      name={field.name}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              ) : (
                <Form.Control
                  type={field.type || "text"}
                  name={field.name}
                  defaultValue={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
