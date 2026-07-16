import axiosInstance from './axios';

export const getTickets = async () => {
    const response = await axiosInstance.get('/api/tickets');
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await axiosInstance.get(`/api/tickets/${id}`);
    return response.data;
};