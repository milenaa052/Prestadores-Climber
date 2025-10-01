import { Service, Provider, Rating } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Limpeza Residencial',
    description: 'Limpeza completa de residências',
    category: 'Limpeza',
    active: true,
  },
  {
    id: '2',
    name: 'Jardinagem',
    description: 'Cuidados com jardins e plantas',
    category: 'Jardim',
    active: true,
  },
  {
    id: '3',
    name: 'Pintura',
    description: 'Pintura de paredes e ambientes',
    category: 'Construção',
    active: true,
  },
  {
    id: '4',
    name: 'Eletricista',
    description: 'Serviços elétricos residenciais',
    category: 'Elétrica',
    active: true,
  },
  {
    id: '5',
    name: 'Encanador',
    description: 'Serviços hidráulicos',
    category: 'Hidráulica',
    active: true,
  },
];

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@provider.com',
    type: 'provider',
    active: true,
    createdAt: '2024-01-01',
    services: ['1', '3'],
    availability: {
      monday: { start: '08:00', end: '18:00', available: true },
      tuesday: { start: '08:00', end: '18:00', available: true },
      wednesday: { start: '08:00', end: '18:00', available: true },
      thursday: { start: '08:00', end: '18:00', available: true },
      friday: { start: '08:00', end: '18:00', available: true },
      saturday: { start: '08:00', end: '14:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    rating: 4.8,
    reviewCount: 12,
    gallery: [],
    description: 'Profissional experiente em limpeza e pintura',
    online: true,
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    email: 'carlos@provider.com',
    type: 'provider',
    active: true,
    createdAt: '2024-01-02',
    services: ['2', '4'],
    availability: {
      monday: { start: '07:00', end: '17:00', available: true },
      tuesday: { start: '07:00', end: '17:00', available: true },
      wednesday: { start: '07:00', end: '17:00', available: true },
      thursday: { start: '07:00', end: '17:00', available: true },
      friday: { start: '07:00', end: '17:00', available: true },
      saturday: { start: '00:00', end: '00:00', available: false },
      sunday: { start: '00:00', end: '00:00', available: false },
    },
    rating: 4.5,
    reviewCount: 8,
    gallery: [],
    description: 'Especialista em jardinagem e serviços elétricos',
    online: true,
  },
];

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