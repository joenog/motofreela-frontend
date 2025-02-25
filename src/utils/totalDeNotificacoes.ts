import axios from '../services/axios';

export const totalDeNotificacoes = async (
  userType: 'business' | 'motoboy',
  id: number | undefined,
): Promise<number | undefined> => {
  // Retorna uma Promise que resolve para number ou undefined
  if (userType === 'business' && id) {
    try {
      const response = await axios.get(`notification-business/${id}`);
      return response.data.length;
    } catch (error: any) {
      console.error(error.message);
      return undefined; // Retorna undefined em caso de erro
    }
  } else if (userType === 'motoboy' && id) {
    try {
      const response = await axios.get(`notification-motoboy/${id}`);
      return response.data.length;
    } catch (error: any) {
      console.error(error.message);
      return undefined; // Retorna undefined em caso de erro
    }
  }
  return undefined; // Retorna undefined se as condições não forem atendidas
};
