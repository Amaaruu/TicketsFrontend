import { Form } from 'react-bootstrap';

const FormField = ({ label, type = "text", placeholder, value, onChange, name, error }) => {
  return (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      {label && <Form.Label className="fw-bold">{label}</Form.Label>}
      <Form.Control 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        name={name}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;