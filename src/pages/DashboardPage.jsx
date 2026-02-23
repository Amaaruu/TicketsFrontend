import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import LoginForm from '../components/organisms/LoginForm';
import api from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      // Llamada real a tu endpoint de Spring Boot
      const response = await api.post('/auth/login', credentials);
      
      // Guardamos en Zustand
      setToken(response.data.token);
      setUser({
        email: response.data.email,
        rol: response.data.rol
      });

      // Redirigimos al Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || "Error al conectar con el servidor");
    }
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={5}>
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary">Helpdesk</h1>
            <p className="text-muted">Gestión de incidentes técnica</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          
          <LoginForm onLogin={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;