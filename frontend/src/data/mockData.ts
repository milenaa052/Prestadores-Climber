import { Rating } from '../types';

export const mockRatings: Rating[] = [
  {
    id: '1',
    providerId: '1',
    clientId: '2',
    serviceId: '1',
    providerRating: 5,
    clientRating: 4,
    providerComment: 'Cliente muito educado e pontual',
    clientComment: 'Excelente serviço, muito profissional',
    createdAt: '2024-01-15',
    visible: true,
  },
];