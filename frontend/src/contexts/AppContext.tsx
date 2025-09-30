import { createContext, useContext, useState, ReactNode } from 'react';
import { Service, Provider, Review, Booking, AppContextType } from '../types';
import { mockServices, mockProviders, mockReviews } from '../data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const updateProvider = (providerId: string, data: Partial<Provider>) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId ? { ...provider, ...data } : provider
    ));
  };

  const updateService = (serviceId: string, data: Partial<Service>) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, ...data } : service
    ));
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (reviewId: string, data: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, ...data, updatedAt: new Date().toISOString() }
        : review
    ));
  };

  const getProvidersByService = (serviceId: string): Provider[] => {
    return providers.filter(provider => 
      provider.services.includes(serviceId) && 
      provider.isActive
    );
  };

  const getVisibleReviews = (providerId: string): Review[] => {
    return reviews.filter(review => 
      review.providerId === providerId && 
      review.isVisible &&
      review.providerRating !== undefined &&
      review.clientRating !== undefined
    );
  };

  return (
    <AppContext.Provider value={{
      services,
      providers,
      reviews,
      bookings,
      updateProvider,
      updateService,
      addReview,
      updateReview,
      getProvidersByService,
      getVisibleReviews
    }}>
      {children}
    </AppContext.Provider>
  );
};