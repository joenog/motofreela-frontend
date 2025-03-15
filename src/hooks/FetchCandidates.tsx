import { useEffect, useState } from 'react';
import Candidates from '../types/candidates';
import axios from '../services/axios';

function FetchCandidates() {
  const [candidates, setCandidates] = useState<Candidates[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/candidatos/readAll/');
        setCandidates(response.data);
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

  return { candidates, isLoading };
}

export default FetchCandidates;
