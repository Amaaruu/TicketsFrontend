import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LogOut, Ticket } from 'lucide-react';

const NavbarCustom = ({ user, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <Ticket className="me-2" /> Helpdesk
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#tickets">Mis Tickets</Nav.Link>
            {user?.rol === 'ADMINISTRADOR' && <Nav.Link href="#users">Usuarios</Nav.Link>}
          </Nav>
          <Nav className="align-items-center">
            <span className="text-light me-3 small">{user?.email}</span>
            <Button variant="outline-danger" size="sm" onClick={onLogout}>
              <LogOut size={16} className="me-1" /> Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;