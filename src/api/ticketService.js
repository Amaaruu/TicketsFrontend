import api from './axios';

export const ticketService = {
  // Tickets
  getAll: () => api.get('/tickets'),
  getMine: (clienteId) => api.get(`/tickets/cliente/${clienteId}`),
  getById: (id) => api.get(`/tickets/${id}`),
  create: (data) => api.post('/tickets', data),
  delete: (id) => api.delete(`/tickets/${id}`),
  
  // Cambio de Estado (Solo Admin/Agente)
  updateStatus: (id, estadoId) => api.put(`/tickets/${id}/estado?estadoId=${estadoId}`),

  // Catálogos
  getCatalogos: () => api.get('/catalogos'),
  
  // Comentarios / Chat
  getComments: (ticketId) => api.get(`/tickets/${ticketId}/comentarios`),
  addComment: (ticketId, data) => api.post(`/tickets/${ticketId}/comentarios`, data)
};