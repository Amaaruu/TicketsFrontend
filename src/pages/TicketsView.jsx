import { useEffect, useState } from 'react';
import { getTickets } from '../api/ticketService';
import '../styles/pages/ViewStyles.css';

const TicketsView = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getTickets();
                setTickets(data);
            } catch (err) {
                setError('Error al cargar los tickets');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <div className="loading-state">Cargando tickets...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="view-container">
            <h2>Bandeja de Tickets</h2>
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Asunto</th>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Adjuntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No hay tickets registrados.</td>
                            </tr>
                        ) : (
                            tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>#{ticket.id}</td>
                                    <td>{ticket.asunto}</td>
                                    <td>
                                        {ticket.nombreCliente} <br />
                                        <small>{ticket.emailCliente}</small>
                                    </td>
                                    <td>
                                        <span className={`badge-status ${ticket.estado.toLowerCase()}`}>
                                            {ticket.estado}
                                        </span>
                                    </td>
                                    <td>{new Date(ticket.fechaCreacion).toLocaleString()}</td>
                                    <td>{ticket.adjuntos?.length || 0}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketsView;