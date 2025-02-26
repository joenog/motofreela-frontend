import { useEffect, useState } from 'react';
import UserBusiness from '../types/userBusiness';
import axios from '../services/axios';

function useBusinessData() {
  const [businesses, setBusinesses] = useState<UserBusiness[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/user-business/readAll');
        setBusinesses(response.data);
      } catch (error: any) {
        console.log('Erro ao carregar os dados de user-business', error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return { businesses, isLoading };
}

export default useBusinessData;
