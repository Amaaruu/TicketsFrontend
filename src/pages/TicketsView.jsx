import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { ticketService } from '../api/ticketService';
import TicketTable from '../components/organisms/TicketTable';
import '../styles/pages/ViewStyles.css';

const TicketsView = () => {
  const user = useAuthStore(state => state.user);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      if (user.rol === 'CLIENTE') {
        const res = await ticketService.getMine(user.id);
        setTickets(res.data);
      } else {
        const res = await ticketService.getAll();
        setTickets(res.data);
      }
    } catch (err) {
      console.error("Error cargando tickets", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleEliminar = async (ticketId) => {
    if (window.confirm("¿Estás seguro de eliminar permanentemente este ticket?")) {
      try {
        await ticketService.delete(ticketId);
        fetchTickets(); 
      } catch (error) {
        alert("Error al eliminar el ticket");
      }
    }
  };

  return (
    <div className="view-container">
      <h3 className="view-header mb-4">
        {user.rol === 'CLIENTE' ? 'Mis Tickets' : 'Bandeja de Entrada'}
      </h3>
      <TicketTable tickets={tickets} user={user} onEliminar={handleEliminar} />
    </div>
  );
};

export default TicketsView;