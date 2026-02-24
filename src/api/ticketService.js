import api from './axios';

export const ticketService = {
  getAll: () => api.get('/tickets'),
  getMine: (clienteId) => api.get(`/tickets/cliente/${clienteId}`),
  create: (data) => api.post('/tickets', data),
  getCatalogos: () => api.get('/catalogos'),
  delete: (id) => api.delete(`/tickets/${id}`)
};