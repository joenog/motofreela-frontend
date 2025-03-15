import { useEffect, useState } from 'react';
import Hired from '../types/hired';
import axios from '../services/axios';

function FetchHired() {
  const [hired, setHired] = useState<Hired[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/contratados/readAll/');
        setHired(response.data);
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

  return { hired, isLoading };
}

export default FetchHired;
