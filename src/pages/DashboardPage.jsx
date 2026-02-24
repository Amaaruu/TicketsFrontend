import { useEffect, useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import { useAuthStore } from '../store/useAuthStore';
import TicketTable from '../components/organisms/TicketTable';
import TicketCreateForm from '../components/organisms/TicketCreateForm';
import api from '../api/axios';

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Si es ADMIN o AGENTE, traemos todos los tickets
    if (user?.rol !== 'CLIENTE') {
      api.get('/tickets').then(res => setTickets(res.data));
    }
  }, [user]);

  const handleCreateTicket = async (data) => {
    try {
      await api.post('/tickets', data);
      alert("Ticket creado con éxito");
    } catch (err) {
      alert("Error al crear ticket");
    }
  };

  return (
    <MainLayout user={user} onLogout={logout}>
      <header className="mb-4">
        <h1>Panel de Control</h1>
        <p className="text-muted">Bienvenido al portal de soporte técnico</p>
      </header>

      {/* VISTA SEGÚN ROL */}
      {user?.rol === 'ADMINISTRADOR' || user?.rol === 'AGENTE' ? (
        <TicketTable tickets={tickets} />
      ) : (
        <TicketCreateForm onCreate={handleCreateTicket} />
      )}
    </MainLayout>
  );
};

export default DashboardPage;