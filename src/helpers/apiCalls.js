import { axiosInstance as axios } from './axiosConfig';

export const resolveTicket = async (id) => {
  try {
    const { data } = await axios.put(`/reports/${id}`, {
      ticketState: 'CLOSED',
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchAllReports = async () => {
  try {
    const { data } = await axios.get('/reports');
    return data;
  } catch (error) {
    return error;
  }
};
