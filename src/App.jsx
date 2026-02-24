import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import CreateTicketView from './pages/CreateTicketView';
import TicketsView from './pages/TicketsView';
import UsersView from './pages/UsersView';
import PrivateRoute from './components/atoms/PrivateRoute';

// Componente inteligente que decide a dónde mandar al usuario al loguearse
const DashboardIndex = () => {
  const user = useAuthStore(state => state.user);
  if (user?.rol === 'CLIENTE') return <Navigate to="/dashboard/crear" replace />;
  return <Navigate to="/dashboard/tickets" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Protegidas del Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          
          {/* Índice por defecto (Redirige según el rol) */}
          <Route index element={<DashboardIndex />} />
          
          {/* Sub-Rutas */}
          <Route path="crear" element={<CreateTicketView />} />
          <Route path="tickets" element={<TicketsView />} />
          <Route path="usuarios" element={<UsersView />} />

        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;