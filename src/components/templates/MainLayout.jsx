import { Container } from 'react-bootstrap';
import NavbarCustom from '../organisms/NavbarCustom';

const MainLayout = ({ children, user, onLogout }) => {
  return (
    <div className="bg-light min-vh-100">
      <NavbarCustom user={user} onLogout={onLogout} />
      <Container className="py-4">
        {children}
      </Container>
    </div>
  );
};

export default MainLayout;