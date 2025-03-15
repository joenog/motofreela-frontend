export default interface Vacancy {
  id: number;
  price: string;
  additional: string;
  benefits: string;
  status: 'Pendente' | 'Finalizada';
  time: string;
  description: string;
  business_id: number;
  created_at: string;
  updated_at: string;
}
