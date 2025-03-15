import Hired from '../types/hired';
import Vacancy from '../types/vacancy';

export const filtrarVagasFinalizadasMotoboy = (
  id: number,
  vacancies: Vacancy[],
  hired: Hired[],
) => {
  if (!id || !vacancies || !hired) return [];

  const idsVagasFinalizadas = hired
    .filter((h) => h.motoboy_id === id)
    .map((h) => h.vacancy_id);
  const vacanciesFinalizadas = vacancies.filter(
    (v) => idsVagasFinalizadas.includes(v.id) && v.status === 'Finalizada',
  );
  return vacanciesFinalizadas;
};
