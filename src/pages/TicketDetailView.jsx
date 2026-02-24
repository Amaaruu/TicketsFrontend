import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Send, ArrowLeft, Trash2 } from 'lucide-react';
import { ticketService } from '../api/ticketService';
import { useAuthStore } from '../store/useAuthStore';
import ButtonCustom from '../components/atoms/ButtonCustom';
import '../styles/pages/TicketDetailView.css';

const TicketDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  const [ticket, setTicket] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const [resTicket, resComentarios] = await Promise.all([
        ticketService.getById(id),
        ticketService.getComments(id)
      ]);
      setTicket(resTicket.data);
      setComentarios(resComentarios.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error al cargar el ticket");
      navigate('/dashboard/tickets');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const handleEnviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    try {
      await ticketService.addComment(id, {
        mensaje: nuevoMensaje,
        usuario: { id: user.id } 
      });
      setNuevoMensaje("");
      cargarDatos(); 
    } catch (err) {
      alert("Error al enviar respuesta");
    }
  };

  const handleCerrarTicket = async () => {
    if(window.confirm("¿Seguro que deseas marcar este ticket como RESUELTO?")) {
      await ticketService.updateStatus(id, 3);
      cargarDatos();
    }
  };

  const handleEliminarTicket = async () => {
    if(window.confirm("¿Estás seguro de que deseas ELIMINAR este ticket y todos sus mensajes? Esta acción no se puede deshacer.")) {
      try {
        await ticketService.delete(id);
        navigate('/dashboard/tickets');
      } catch (err) {
        alert("Error al eliminar el ticket");
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <div>
      <ButtonCustom variant="light" className="mb-4 text-primary fw-bold" onClick={() => navigate('/dashboard/tickets')}>
        <ArrowLeft size={18} className="me-2" /> Volver a la lista
      </ButtonCustom>

      <Row>
        <Col lg={4}>
          <div className="ticket-detail-card h-100">
            <h5 className="text-muted mb-1">Ticket #{ticket.id}</h5>
            <h3 className="fw-bold text-dark mb-4">{ticket.titulo}</h3>
            
            <div className="mb-3">
              <span className="d-block text-muted small">Cliente</span>
              <span className="fw-bold">{ticket.clienteNombre}</span>
            </div>
            
            <div className="mb-3">
              <span className="d-block text-muted small">Estado</span>
              <Badge bg={ticket.estado === 'RESUELTO' ? 'success' : 'secondary'}>{ticket.estado}</Badge>
            </div>

            <div className="mb-3">
              <span className="d-block text-muted small">Categoría y Prioridad</span>
              <Badge bg="info" className="me-2">{ticket.categoriaNombre}</Badge>
              <Badge bg={ticket.prioridadNombre === 'URGENTE' ? 'danger' : 'warning'}>{ticket.prioridadNombre}</Badge>
            </div>

            <hr />
            <h6 className="fw-bold text-dark">Descripción original:</h6>
            <p className="text-muted small" style={{ whiteSpace: 'pre-wrap' }}>{ticket.descripcion}</p>

            {user.rol !== 'CLIENTE' && (
              <div className="mt-4">
                {ticket.estado !== 'RESUELTO' && (
                  <ButtonCustom variant="success" className="w-100 mb-2" onClick={handleCerrarTicket}>
                    Marcar como Resuelto
                  </ButtonCustom>
                )}
                
                <ButtonCustom variant="outline-danger" className="w-100" onClick={handleEliminarTicket}>
                  <Trash2 size={16} className="me-2" /> Eliminar Ticket Permanentemente
                </ButtonCustom>
              </div>
            )}
          </div>
        </Col>

        <Col lg={8}>
          <div className="ticket-detail-card h-100 d-flex flex-column">
            <h4 className="fw-bold text-dark mb-4">Historial de Conversación</h4>
            
            <div className="chat-container flex-grow-1 mb-4">
              {comentarios.length === 0 ? (
                <p className="text-center text-muted mt-4">No hay respuestas aún. Escribe el primer mensaje.</p>
              ) : (
                comentarios.map(c => (
                  <div key={c.id} className={`comment-bubble ${c.autorRol?.toLowerCase()}`}>
                    <div className="comment-header">
                      <span className="comment-author">
                        {c.autorNombre} <Badge bg="light" text="dark" className="ms-1 border">{c.autorRol}</Badge>
                      </span>
                      <span className="comment-date">{new Date(c.creadoEn).toLocaleString()}</span>
                    </div>
                    <p className="comment-message">{c.mensaje}</p>
                  </div>
                ))
              )}
            </div>

            {ticket.estado !== 'RESUELTO' && ticket.estado !== 'CERRADO' ? (
              <Form onSubmit={handleEnviarComentario} className="mt-auto">
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Escribe tu respuesta aquí..." 
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    className="bg-light"
                  />
                </Form.Group>
                <div className="text-end">
                  <ButtonCustom type="submit" variant="primary">
                    <Send size={16} className="me-2" /> Enviar Respuesta
                  </ButtonCustom>
                </div>
              </Form>
            ) : (
              <div className="alert alert-success text-center mt-auto mb-0">
                Este ticket está resuelto. Ya no se pueden agregar más respuestas.
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TicketDetailView;