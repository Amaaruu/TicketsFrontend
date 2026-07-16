import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import '../../styles/components/organisms/NavbarCustom.css';

const NavbarCustom = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">TicketsApp</div>
            <ul className="navbar-links">
                <li><Link to="/tickets">Tickets</Link></li>
                <li><Link to="/users">Usuarios</Link></li>
            </ul>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
    );
};

export default NavbarCustom;