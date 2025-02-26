// hooks/useVacancyData.ts
import { useState, useEffect } from 'react';
import axios from '../services/axios';
import Vacancy from '../types/vacancy';

function useVacancyData() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/vacancy');
        setVacancies(response.data);
      } catch (error) {
        console.error('Error ao carregar os dados das vagas:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { vacancies, isLoading };
}

export default useVacancyData;
