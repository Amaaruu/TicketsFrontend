import TicketCreateForm from '../components/organisms/TicketCreateForm';
import { ticketService } from '../api/ticketService';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewStyles.css'; // <-- Ruta actualizada

const CreateTicketView = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await ticketService.create(data);
      navigate('/dashboard/tickets');
    } catch (err) {
      alert("Error al crear el ticket");
    }
  };

  return (
    <div className="view-container">
      <h3 className="view-header mb-2">¿En qué podemos ayudarte?</h3>
      <p className="text-muted mb-4">Completa el formulario y un agente te atenderá a la brevedad.</p>
      <TicketCreateForm onCreate={handleCreate} />
    </div>
  );
};

export default CreateTicketView;