import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LogOut, Ticket } from 'lucide-react';
import '../../styles/components/organisms/NavbarCustom.css'; // <-- Ruta actualizada

const NavbarCustom = ({ user, onLogout }) => {
  return (
    <Navbar expand="lg" className="navbar-custom-wrapper mb-4 shadow-sm">
      <Container>
        <Navbar.Brand className="d-flex align-items-center fw-bold text-dark">
          <Ticket className="me-2" color="#4318ff" /> Helpdesk
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            {user?.rol === 'CLIENTE' && (
              <>
                <Nav.Link as={NavLink} to="/dashboard/crear" className="nav-link-custom">Crear Ticket</Nav.Link>
                <Nav.Link as={NavLink} to="/dashboard/tickets" className="nav-link-custom">Mis Tickets</Nav.Link>
              </>
            )}
            
            {user?.rol !== 'CLIENTE' && (
              <>
                <Nav.Link as={NavLink} to="/dashboard/tickets" className="nav-link-custom">Todos los Tickets</Nav.Link>
                {user?.rol === 'ADMINISTRADOR' && (
                  <Nav.Link as={NavLink} to="/dashboard/usuarios" className="nav-link-custom">Usuarios</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="align-items-center">
            <span className="text-muted me-3 small fw-bold">
              {user?.email} <span className="badge bg-light text-primary border ms-1">{user?.rol}</span>
            </span>
            <Button variant="danger" className="rounded-pill px-3" size="sm" onClick={onLogout}>
              <LogOut size={16} className="me-1" /> Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;