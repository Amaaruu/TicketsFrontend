import api from './axios';

export const ticketService = {
  // Obtener todos los tickets (Admin/Agente)
  getAll: () => api.get('/tickets'),
  
  // Obtener tickets propios (Cliente)
  getMine: (clienteId) => api.get(`/tickets/cliente/${clienteId}`),
  
  // Crear un nuevo ticket
  create: (ticketData) => api.get('/tickets', ticketData),

  // Obtener catálogos para los selects del formulario
  getCatalogos: () => api.get('/catalogos')
};