import React, { useState, useEffect } from 'react';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../api/userService';

const UsersView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', nombre: '', rol: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await actualizarUsuario(editingId, form);
    } else {
      await crearUsuario(form);
    }
    setForm({ username: '', password: '', nombre: '', rol: '' });
    setEditingId(null);
    cargarUsuarios();
  };

  const handleEdit = (u) => {
    setForm({ username: u.username, password: u.password, nombre: u.nombre, rol: u.rol });
    setEditingId(u.id);
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Estás seguro de eliminar este usuario?")) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  // Estilos limpios y minimalistas en línea para rapidez
  const styles = {
    container: { padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#333' },
    title: { fontSize: '24px', fontWeight: '300', marginBottom: '30px', borderBottom: '1px solid #eaeaea', paddingBottom: '10px', letterSpacing: '1px' },
    form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '40px' },
    input: { padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none', fontSize: '14px', transition: 'border-color 0.3s' },
    button: { padding: '12px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' },
    buttonOutline: { padding: '8px 12px', backgroundColor: 'transparent', color: '#000', border: '1px solid #000', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', marginRight: '8px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { textAlign: 'left', padding: '15px 10px', borderBottom: '2px solid #000', fontWeight: '500', fontSize: '14px', textTransform: 'uppercase' },
    td: { padding: '15px 10px', borderBottom: '1px solid #eaeaea', fontSize: '14px' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input style={styles.input} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required />
        <input style={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre Completo" required />
        <input style={styles.input} name="rol" value={form.rol} onChange={handleChange} placeholder="Rol (Ej: ADMIN)" required />
        <button style={styles.button} type="submit">
          {editingId ? 'Guardar Cambios' : 'Añadir Usuario'}
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Rol</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td style={styles.td}>{u.id}</td>
              <td style={styles.td}>{u.username}</td>
              <td style={styles.td}>{u.nombre}</td>
              <td style={styles.td}>{u.rol}</td>
              <td style={styles.td}>
                <button style={styles.buttonOutline} onClick={() => handleEdit(u)}>Editar</button>
                <button style={{...styles.buttonOutline, color: '#d32f2f', borderColor: '#d32f2f'}} onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;