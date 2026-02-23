import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import ButtonCustom from '../atoms/ButtonCustom';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <Card className="shadow-lg border-0 p-4">
      <Card.Body>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <FormField 
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="admin@empresa.com"
            value={credentials.email}
            onChange={handleChange}
          />
          <FormField 
            label="Contraseña"
            name="password"
            type="password"
            placeholder="********"
            value={credentials.password}
            onChange={handleChange}
          />
          <div className="d-grid gap-2 mt-4">
            <ButtonCustom type="submit" variant="primary" size="lg">
              Entrar al Sistema
            </ButtonCustom>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;