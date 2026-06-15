import api from './axios';

// Tu objeto para gestionar usuarios
export const userService = {
  getAll: () => api.get('/usuarios'),
  getById: (id) => api.get(`/usuarios/${id}`),
  create: (usuario) => api.post('/usuarios', usuario),
  update: (id, usuario) => api.put(`/usuarios/${id}`, usuario),
  delete: (id) => api.delete(`/usuarios/${id}`)
};

// LA FUNCIÓN QUE FALTABA PARA EL LOGIN
export const loginUsuario = async (credentials) => {
    // Apunta al AuthController de tu Spring Boot
    const response = await api.post('/auth/login', credentials);
    return response.data; 
};