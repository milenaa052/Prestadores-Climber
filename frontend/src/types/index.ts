export interface User {
  id: string;
  name: string;
  email: string;
  type: 'provider' | 'client' | 'admin';
  active: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  active: boolean;
}

export interface Provider extends User {
  type: 'provider';
  services: string[];
  availability: {
    [day: string]: { start: string; end: string; available: boolean };
  };
  rating: number;
  reviewCount: number;
  gallery: string[];
  description: string;
  online: boolean;
}

export interface Client extends User {
  type: 'client';
}

export interface Rating {
  id: string;
  providerId: string;
  clientId: string;
  serviceId: string;
  providerRating?: number;
  clientRating?: number;
  providerComment?: string;
  clientComment?: string;
  createdAt: string;
  visible: boolean;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  scheduledDate: string;
  createdAt: string;
}