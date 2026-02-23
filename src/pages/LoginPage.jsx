import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log("Datos para el API:", data);
    // Aquí llamaremos a tu servicio de login pronto
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={5}>
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary">Helpdesk</h1>
          </div>
          <LoginForm onLogin={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;