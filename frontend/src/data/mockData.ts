import { Service, Provider, Client, Admin, Review } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Limpeza Residencial',
    description: 'Serviços de limpeza completa para residências',
    category: 'Limpeza',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2', 
    name: 'Jardinagem',
    description: 'Cuidados com jardins e plantas',
    category: 'Jardinagem',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Encanamento',
    description: 'Reparos e instalações hidráulicas',
    category: 'Manutenção',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Elétrica',
    description: 'Instalações e reparos elétricos',
    category: 'Manutenção', 
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'Pintura',
    description: 'Serviços de pintura residencial e comercial',
    category: 'Reforma',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    name: 'Cuidador de Idosos',
    description: 'Cuidados especializados para idosos',
    category: 'Cuidados',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    type: 'provider',
    phone: '(11) 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    isOnline: true,
    services: ['1', '2'], // Limpeza e Jardinagem
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
    ],
    availability: [
      { id: '1', dayOfWeek: 1, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { id: '2', dayOfWeek: 2, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { id: '3', dayOfWeek: 3, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { id: '4', dayOfWeek: 4, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { id: '5', dayOfWeek: 5, startTime: '08:00', endTime: '17:00', isAvailable: true }
    ],
    rating: 4.8,
    totalReviews: 15,
    description: 'Prestador experiente em limpeza e jardinagem com mais de 5 anos de experiência.',
    yearsOfExperience: 5,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    type: 'provider',
    phone: '(11) 88888-8888',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    isOnline: false,
    services: ['3', '4'], // Encanamento e Elétrica
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    availability: [
      { id: '6', dayOfWeek: 1, startTime: '09:00', endTime: '18:00', isAvailable: true },
      { id: '7', dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isAvailable: true },
      { id: '8', dayOfWeek: 3, startTime: '09:00', endTime: '18:00', isAvailable: true }
    ],
    rating: 4.9,
    totalReviews: 23,
    description: 'Especialista em reparos elétricos e hidráulicos.',
    yearsOfExperience: 8,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com', 
    type: 'provider',
    phone: '(11) 77777-7777',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    isOnline: true,
    services: ['5'], // Pintura
    gallery: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop'
    ],
    availability: [
      { id: '9', dayOfWeek: 1, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { id: '10', dayOfWeek: 2, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { id: '11', dayOfWeek: 3, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { id: '12', dayOfWeek: 4, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { id: '13', dayOfWeek: 5, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { id: '14', dayOfWeek: 6, startTime: '08:00', endTime: '12:00', isAvailable: true }
    ],
    rating: 4.7,
    totalReviews: 31,
    description: 'Pintor profissional com especialização em pinturas residenciais e comerciais.',
    yearsOfExperience: 12,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    type: 'provider',
    phone: '(11) 66666-6666',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    isOnline: true,
    services: ['6'], // Cuidador de Idosos
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    ],
    availability: [
      { id: '15', dayOfWeek: 1, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '16', dayOfWeek: 2, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '17', dayOfWeek: 3, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '18', dayOfWeek: 4, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '19', dayOfWeek: 5, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '20', dayOfWeek: 6, startTime: '06:00', endTime: '22:00', isAvailable: true },
      { id: '21', dayOfWeek: 0, startTime: '06:00', endTime: '22:00', isAvailable: true }
    ],
    rating: 5.0,
    totalReviews: 18,
    description: 'Cuidadora experiente e certificada para cuidados com idosos.',
    yearsOfExperience: 6,
    createdAt: '2024-01-01'
  }
];

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Pedro Almeida',
    email: 'pedro@email.com',
    type: 'client',
    phone: '(11) 55555-5555',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'c2',
    name: 'Julia Ferreira',
    email: 'julia@email.com',
    type: 'client',
    phone: '(11) 44444-4444',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: 'a1',
    name: 'Admin Master',
    email: 'admin@prestadoresclimber.com',
    type: 'admin',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    providerId: '1',
    clientId: 'c1',
    serviceId: '1',
    providerRating: 5,
    clientRating: 4,
    providerComment: 'Cliente muito educado e pontual.',
    clientComment: 'Excelente trabalho, muito caprichoso na limpeza.',
    isVisible: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'r2',
    providerId: '2',
    clientId: 'c2',
    serviceId: '3',
    providerRating: 5,
    clientRating: 5,
    providerComment: 'Cliente muito organizado e claro nas solicitações.',
    clientComment: 'Resolveu o problema rapidamente, muito profissional.',
    isVisible: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 'r3',
    providerId: '3',
    clientId: 'c1',
    serviceId: '5',
    providerRating: 4,
    clientRating: 5,
    providerComment: 'Ambiente bem preparado, facilitou o trabalho.',
    clientComment: 'Pintura ficou perfeita, superou expectativas.',
    isVisible: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  }
];

export const allUsers = [...mockProviders, ...mockClients, ...mockAdmins];