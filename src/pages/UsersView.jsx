import { useEffect, useState } from 'react';
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { userService } from '../api/userService';
import '../styles/pages/ViewStyles.css';

const UsersView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: '', nombre: '', email: '', passwordHash: '', rol: { id: 2 } });

  const cargarUsuarios = async () => {
    try {
      const res = await userService.getAll();
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ id: '', nombre: '', email: '', passwordHash: '', rol: { id: 2 } });
    setEditMode(false);
  };

  const handleShowCreate = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleShowEdit = (u) => {
    setEditMode(true);
    setFormData({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      passwordHash: '', 
      rol: { id: u.rol === 'ADMINISTRADOR' ? 1 : 2 }
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rolId') {
      setFormData({ ...formData, rol: { id: parseInt(value) } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await userService.update(formData.id, formData);
      } else {
        await userService.create(formData);
      }
      handleClose();
      cargarUsuarios();
    } catch (error) {
      alert("Error al guardar el usuario. Verifica los datos.");
    }
  };

  const handleEliminar = async (id) => {
    if(window.confirm("¿Seguro que deseas desactivar este usuario?")) {
      try {
        await userService.delete(id);
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  return (
    <div className="view-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="view-header m-0">Gestión de Usuarios</h3>
        <Button variant="primary" onClick={handleShowCreate}>
          <Plus size={18} className="me-1"/> Crear Usuario
        </Button>
      </div>

      <Table hover responsive className="custom-table bg-white shadow-sm rounded">
        <thead className="bg-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td className="align-middle">#{u.id}</td>
              <td className="align-middle fw-semibold">{u.nombre}</td>
              <td className="align-middle text-muted">{u.email}</td>
              <td className="align-middle">
                <Badge bg={u.rol === 'ADMINISTRADOR' ? 'danger' : 'info'}>
                  {u.rol}
                </Badge>
              </td>
              <td className="align-middle">
                <Badge bg={u.activo ? 'success' : 'secondary'}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="align-middle">
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(u)}>
                  <Edit2 size={16} />
                </Button>
                {u.activo && (
                  <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(u.id)}>
                    <Trash2 size={16} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            {!editMode && (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Rol del Sistema</Form.Label>
              <Form.Select name="rolId" value={formData.rol.id} onChange={handleChange} required>
                <option value={1}>Administrador</option>
                <option value={2}>Usuario</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersView;