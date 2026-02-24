import { Table, Badge } from 'react-bootstrap';
import '../../styles/components/organisms/TicketTable.css'; // <-- Ruta actualizada

const TicketTable = ({ tickets }) => {
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
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id}>
            <td>#{t.id}</td>
            <td>{t.titulo}</td>
            <td>{t.clienteNombre}</td>
            <td>
              <Badge bg={t.prioridad === 'URGENTE' ? 'danger' : 'info'}>
                {t.prioridad}
              </Badge>
            </td>
            <td>
              <Badge pill bg="secondary">{t.estado}</Badge>
            </td>
            <td>{new Date(t.creadoEn).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketTable;