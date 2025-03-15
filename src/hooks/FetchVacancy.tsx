import { useEffect, useState } from 'react';
import Vacancy from '../types/vacancy';
import axios from '../services/axios';

function FetchVacancy() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/vacancy/');
        setVacancies(response.data);
      } catch (error: any) {
        if (error.response) {
          console.log('Erro ao carregar os dados das vagas!', error);
        } else if (error.request) {
          console.log('Erro ao carregar os dados das vagas!', error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return { vacancies, isLoading };
}

export default FetchVacancy;
