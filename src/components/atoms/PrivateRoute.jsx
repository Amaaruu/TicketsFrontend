import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const PrivateRoute = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  // Si no está autenticado, redirige al login
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;