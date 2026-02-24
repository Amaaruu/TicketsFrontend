import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import ButtonCustom from '../atoms/ButtonCustom';
import api from '../../api/axios';

const TicketCreateForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', categoriaId: '', prioridadId: '' });
  const [catalogos, setCatalogos] = useState({ categorias: [], prioridades: [] });

  useEffect(() => {
    // Llamamos a los endpoints exactos que tienes en tu CatalogoController de Spring Boot
    const fetchCatalogos = async () => {
      try {
        const [resCategorias, resPrioridades] = await Promise.all([
          api.get('/catalogos/categorias'),
          api.get('/catalogos/prioridades')
        ]);
        setCatalogos({
          categorias: resCategorias.data,
          prioridades: resPrioridades.data
        });
      } catch (error) {
        console.error("Error al cargar los catálogos:", error);
      }
    };
    fetchCatalogos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="mb-4 text-dark fw-bold">Crear Nuevo Ticket</h3>
      <Form onSubmit={handleSubmit}>
        <FormField 
          label="Asunto / Título" 
          name="titulo" 
          placeholder="Ej: Problema con la impresora"
          onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
        />
        <FormField 
          label="Descripción del Problema" 
          name="descripcion" 
          as="textarea" 
          placeholder="Describe el problema detalladamente..."
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
        />
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Categoría</Form.Label>
              <Form.Select 
                required 
                onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
                defaultValue=""
              >
                <option value="" disabled>Seleccione una categoría...</option>
                {catalogos.categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Prioridad</Form.Label>
              <Form.Select 
                required 
                onChange={(e) => setFormData({...formData, prioridadId: e.target.value})}
                defaultValue=""
              >
                <option value="" disabled>Seleccione la prioridad...</option>
                {catalogos.prioridades.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <div className="mt-4 text-end">
          <ButtonCustom type="submit" variant="primary" size="lg">
            Enviar Ticket
          </ButtonCustom>
        </div>
      </Form>
    </div>
  );
};

export default TicketCreateForm;