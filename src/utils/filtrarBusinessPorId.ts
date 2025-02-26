import UserBusiness from '../types/userBusiness';

export default function filtrarUserBusinessPorId(
  bussines_id: number,
  business: UserBusiness[] | undefined,
): UserBusiness | undefined {
  if (!business) return undefined;
  const businessFiltrado = business.find(
    (business) => business.id === bussines_id,
  );
  return businessFiltrado;
}
