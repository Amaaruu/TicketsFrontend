import { useEffect, useState } from 'react';
import { Table, Badge, Form, Button } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import { userService } from '../api/userService';
import '../styles/pages/ViewStyles.css'; // <-- Ruta actualizada
import '../styles/components/organisms/TicketTable.css'; // <-- Ruta actualizada

const UsersView = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    const res = await userService.getAll();
    setUsuarios(res.data);
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const handleEliminar = async (id) => {
    if(window.confirm("¿Seguro que deseas desactivar este usuario?")) {
      await userService.delete(id);
      cargarUsuarios();
    }
  };

  const handleCambiarRol = async (id, nuevoRolId) => {
    await userService.updateRole(id, nuevoRolId);
    cargarUsuarios();
  };

  return (
    <div className="view-container">
      <h3 className="view-header mb-4">Gestión de Usuarios</h3>
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol Actual</th>
            <th>Cambiar Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>#{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.rol === 'ADMINISTRADOR' ? 'danger' : u.rol === 'AGENTE' ? 'warning' : 'info'}>
                  {u.rol}
                </Badge>
              </td>
              <td>
                <Form.Select size="sm" onChange={(e) => handleCambiarRol(u.id, e.target.value)} defaultValue="">
                   <option value="" disabled>Asignar...</option>
                   <option value="1">Administrador</option>
                   <option value="2">Agente</option>
                   <option value="3">Cliente</option>
                </Form.Select>
              </td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(u.id)}>
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersView;