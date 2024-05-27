import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const DynamicForm = () => {
  const [formData, setFormData] = useState([{ label: "", value: "" }]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (index, key, value) => {
    const newFormData = [...formData];
    newFormData[index][key] = value;
    setFormData(newFormData);
  };

  const handleAddField = () => {
    setFormData([...formData, { label: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObject = {};
    formData.forEach((field) => {
      formDataObject[field.label] = field.value;
    });
    setSubmittedData(formDataObject);
    setFormData([{ label: "", value: "" }]);
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        {formData.map((field, index) => (
          <div key={index} className="form-card card">
            <Form.Group controlId={`label${index}`}>
              <Form.Label>Field Label:</Form.Label>
              <Form.Control
                type="text"
                value={field.label}
                onChange={(e) => handleChange(index, "label", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId={`value${index}`}>
              <Form.Label>Field Value:</Form.Label>
              <Form.Control
                type="text"
                value={field.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={() => handleRemoveField(index)}>
              Remove Field
            </Button>
          </div>
        ))}
        <div className="action_btn">
          <Button variant="primary" onClick={handleAddField}>
            Add Field
          </Button>
          <Button variant="success" type="submit">
            Submit
          </Button>
          {submittedData && (
            <Alert variant="success">
              <h4>Submitted Data:</h4>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </Alert>
          )}
        </div>
      </Form>
    </div>
  );
};

export default DynamicForm;
