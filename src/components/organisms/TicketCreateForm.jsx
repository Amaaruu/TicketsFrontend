import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import ButtonCustom from '../atoms/ButtonCustom';
import api from '../../api/axios';

const TicketCreateForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', categoriaId: '', prioridadId: '' });
  const [catalogos, setCatalogos] = useState({ categorias: [], prioridades: [] });

  useEffect(() => {
    // Cargar categorías y prioridades desde el backend
    const fetchCatalogos = async () => {
      const res = await api.get('/catalogos');
      setCatalogos(res.data);
    };
    fetchCatalogos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="mb-4">Crear Nuevo Ticket</h3>
      <Form onSubmit={handleSubmit}>
        <FormField label="Asunto / Título" name="titulo" onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
        <FormField label="Descripción del Problema" name="descripcion" as="textarea" onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
        
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Categoría</Form.Label>
              <Form.Select onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}>
                <option>Seleccione...</option>
                {catalogos.categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Prioridad</Form.Label>
              <Form.Select onChange={(e) => setFormData({...formData, prioridadId: e.target.value})}>
                <option>Seleccione...</option>
                {catalogos.prioridades.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <ButtonCustom type="submit" variant="success" className="mt-3">Enviar Ticket</ButtonCustom>
      </Form>
    </div>
  );
};

export default TicketCreateForm;