import TicketCreateForm from '../components/organisms/TicketCreateForm';
import { ticketService } from '../api/ticketService';
import { useNavigate } from 'react-router-dom';

const CreateTicketView = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await ticketService.create(data);
      navigate('/dashboard/tickets'); // Lo mandamos a ver sus tickets tras crear
    } catch (err) {
      alert("Error al crear el ticket");
    }
  };

  return (
    <div className="modern-card">
      <h3 className="fw-bold mb-4 text-dark">¿En qué podemos ayudarte?</h3>
      <p className="text-muted mb-4">Completa el formulario y un agente te atenderá a la brevedad.</p>
      <TicketCreateForm onCreate={handleCreate} />
    </div>
  );
};
export default CreateTicketView;