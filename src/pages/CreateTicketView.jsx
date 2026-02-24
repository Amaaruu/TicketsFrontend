import TicketCreateForm from '../components/organisms/TicketCreateForm';
import { ticketService } from '../api/ticketService';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; // <-- Importamos el Store
import '../styles/pages/ViewStyles.css';

const CreateTicketView = () => {
  const navigate = useNavigate();
  // Obtenemos al usuario logueado para saber de quién será el ticket
  const user = useAuthStore(state => state.user); 

  const handleCreate = async (data) => {
    try {
      // Formateamos el JSON exactamente como lo pide tu backend (Entidades anidadas)
      const payload = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        cliente: { id: user.id }, // Asignamos el ticket al creador
        categoria: { id: parseInt(data.categoriaId) },
        prioridad: { id: parseInt(data.prioridadId) }
      };

      await ticketService.create(payload);
      
      // Si todo sale bien, lo enviamos a ver su tabla de tickets
      navigate('/dashboard/tickets');
    } catch (err) {
      alert("Error al crear el ticket. Revisa la consola.");
      console.error(err);
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