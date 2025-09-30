export interface User {
  id: string;
  name: string;
  email: string;
  type: 'provider' | 'client' | 'admin';
  phone?: string;
  avatar?: string;
  isActive: boolean;
  isOnline?: boolean;
  createdAt: string;
}

export interface Provider extends User {
  type: 'provider';
  services: string[];
  gallery: string[];
  availability: Availability[];
  rating: number;
  totalReviews: number;
  description?: string;
  yearsOfExperience?: number;
}

export interface Client extends User {
  type: 'client';
}

export interface Admin extends User {
  type: 'admin';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Availability {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  providerId: string;
  clientId: string;
  serviceId: string;
  providerRating?: number;
  clientRating?: number;
  providerComment?: string;
  clientComment?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  providerId: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'provider' | 'client' | 'admin') => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  type: 'provider' | 'client';
  phone?: string;
  services?: string[];
}

export interface AppContextType {
  services: Service[];
  providers: Provider[];
  reviews: Review[];
  bookings: Booking[];
  updateProvider: (providerId: string, data: Partial<Provider>) => void;
  updateService: (serviceId: string, data: Partial<Service>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReview: (reviewId: string, data: Partial<Review>) => void;
  getProvidersByService: (serviceId: string) => Provider[];
  getVisibleReviews: (providerId: string) => Review[];
}