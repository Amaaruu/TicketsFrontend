import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import api from '../api/axios'; // Tu instancia de axios configurada
import { useAuthStore } from '../store/useAuthStore'; // Tu store de Zustand
import '../../styles/pages/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      
      // 1. Llamada real a tu backend Spring Boot
      const response = await api.post('/auth/login', credentials);
      
      // 2. Guardar datos en el estado global (Zustand)
      setToken(response.data.token);
      setUser({
        id: response.data.id, // NUEVO
        email: response.data.email,
        rol: response.data.rol
      });

      // 3. Redirigir al Dashboard tras éxito
      navigate('/dashboard');
      
    } catch (err) {
      // Manejo de errores (credenciales inválidas, servidor caído, etc.)
      const message = err.response?.data || "Error al conectar con el servidor";
      setError(typeof message === 'object' ? "Credenciales incorrectas" : message);
    }
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={5}>
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary">Helpdesk</h1>
            <p className="text-muted">Inicia sesión para gestionar tus tickets</p>
          </div>

          {/* Mostrar alerta si el login falla */}
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          
          <LoginForm onLogin={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;