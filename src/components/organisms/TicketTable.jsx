import { Table, Badge } from 'react-bootstrap';

const TicketTable = ({ tickets }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="mb-4">Listado de Tickets</h3>
      <Table hover responsive>
        <thead className="table-light">
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
    </div>
  );
};

export default TicketTable;