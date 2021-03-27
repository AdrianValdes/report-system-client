import { axiosInstance as axios } from './axiosConfig';

export const resolveTicket = async (id) => {
  try {
    const { data } = await axios.put(`/reports/${id}`, {
      ticketState: 'CLOSED',
    });
    return data;
  } catch (err) {
    console.log(err);
  }
  return undefined;
};
