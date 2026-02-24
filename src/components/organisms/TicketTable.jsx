import { Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import '../../styles/components/organisms/TicketTable.css';

const TicketTable = ({ tickets }) => {
  const navigate = useNavigate();

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
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id}>
            <td>#{t.id}</td>
            <td className="fw-bold text-dark">{t.titulo}</td>
            <td>{t.clienteNombre}</td>
            <td>
              <Badge bg={t.prioridad === 'URGENTE' ? 'danger' : t.prioridad === 'ALTA' ? 'warning' : 'info'}>
                {t.prioridad}
              </Badge>
            </td>
            <td>
              <Badge bg={t.estado === 'CERRADO' || t.estado === 'RESUELTO' ? 'success' : 'secondary'}>
                {t.estado}
              </Badge>
            </td>
            <td>{new Date(t.creadoEn).toLocaleDateString()}</td>
            <td>
              <Button 
                variant="light" 
                size="sm" 
                className="rounded-circle shadow-sm"
                onClick={() => navigate(`/dashboard/tickets/${t.id}`)}
              >
                <Eye size={16} color="#4318ff" />
              </Button>
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