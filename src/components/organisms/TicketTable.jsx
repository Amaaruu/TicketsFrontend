import { Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import '../../styles/components/organisms/TicketTable.css';

const TicketTable = ({ tickets, user, onEliminar }) => {
  const navigate = useNavigate();

  const isUpdated = (creadoEn, actualizadoEn) => {
    if (!actualizadoEn) return false;
    const tiempoCreacion = new Date(creadoEn).getTime();
    const tiempoActualizacion = new Date(actualizadoEn).getTime();
    return (tiempoActualizacion - tiempoCreacion) > 5000; 
  };

  return (
    <Table hover responsive className="custom-table mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Cliente</th>
          <th>Prioridad</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id}>
            <td>#{t.id}</td>
            <td>
              <span className="fw-bold text-dark">{t.titulo}</span>
              {isUpdated(t.creadoEn, t.actualizadoEn) && t.estado !== 'RESUELTO' && (
                <Badge bg="warning" text="dark" className="ms-2 shadow-sm">
                  Actualizado
                </Badge>
              )}
            </td>
            <td>{t.clienteNombre}</td>
            <td>
              <Badge bg={t.prioridad === 'URGENTE' ? 'danger' : t.prioridad === 'ALTA' ? 'warning' : 'info'}>
                {t.prioridad}
              </Badge>
            </td>
            <td>
              <Badge bg={t.estado === 'RESUELTO' || t.estado === 'CERRADO' ? 'success' : 'secondary'}>
                {t.estado}
              </Badge>
            </td>
            <td>{new Date(t.creadoEn).toLocaleDateString()}</td>
            <td className="text-center">
              <Button 
                variant="light" 
                size="sm" 
                className="rounded-circle shadow-sm"
                onClick={() => navigate(`/dashboard/tickets/${t.id}`)}
                title="Ver Detalle"
              >
                <Eye size={16} color="#4318ff" />
              </Button>
              
              {user?.rol !== 'CLIENTE' && (
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="rounded-circle shadow-sm ms-2 border-0"
                  onClick={() => onEliminar(t.id)}
                  title="Eliminar Ticket"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </td>
          </tr>
        ))}
        {tickets.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center py-4 text-muted">No hay tickets para mostrar.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TicketTable;