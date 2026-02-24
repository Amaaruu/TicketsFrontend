import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import api from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import '../styles/pages/LoginPage.css'; // <-- Ruta actualizada

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
      setToken(response.data.token);
      setUser({
        id: response.data.id,
        email: response.data.email,
        rol: response.data.rol
      });
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data || "Error al conectar con el servidor";
      setError(typeof message === 'object' ? "Credenciales incorrectas" : message);
    }
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={5}>
          <div className="text-center mb-4">
            <h1 className="display-4 login-title">Helpdesk</h1>
            <p className="text-muted">Inicia sesión para gestionar tus tickets</p>
          </div>
          {error && <Alert variant="danger" className="mb-4 rounded-3">{error}</Alert>}
          <div className="login-card">
            <LoginForm onLogin={handleLogin} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;