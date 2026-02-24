import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import CreateTicketView from './pages/CreateTicketView';
import TicketsView from './pages/TicketsView';
import UsersView from './pages/UsersView';
import TicketDetailView from './pages/TicketDetailView'; // <-- NUEVA IMPORTACIÓN
import PrivateRoute from './components/atoms/PrivateRoute';

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

        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<DashboardIndex />} />
          <Route path="crear" element={<CreateTicketView />} />
          <Route path="tickets" element={<TicketsView />} />
          
          {/* NUEVA RUTA: Detalle del Ticket Dinámico */}
          <Route path="tickets/:id" element={<TicketDetailView />} />
          
          <Route path="usuarios" element={<UsersView />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;