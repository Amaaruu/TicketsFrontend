import api from './axios';

export const userService = {
  getAll: () => api.get('/usuarios'),
  delete: (id) => api.delete(`/usuarios/${id}`),
  updateRole: (id, rolId) => api.patch(`/usuarios/${id}`, { rol: { id: rolId } })
};