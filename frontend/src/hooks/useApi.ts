import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/Api';

interface ApiError {
  response?: {
    status?: number;
    data?: unknown;
  };
  message?: string;
}

export const useApi = () => {
  const { logout } = useAuth();

  const get = async <T = unknown>(url: string): Promise<T> => {
    try {
      const response = await api.get(url);
      return response.data;

    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.response?.status === 401) {
        logout();
      }

      throw error;
    }
  };

  const post = async <T = unknown>(url: string, data?: unknown): Promise<T> => {
    try {
      const response = await api.post(url, data);
      return response.data;

    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.response?.status === 401) {
        logout();
      }

      throw error;
    }
  };

  const put = async <T = unknown>(url: string, data?: unknown): Promise<T> => {
    try {
      const response = await api.put(url, data);
      return response.data;

    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.response?.status === 401) {
        logout();
      }

      throw error;
    }
  };

  const del = async <T = unknown>(url: string): Promise<T> => {
    try {
      const response = await api.delete(url);
      return response.data;

    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.response?.status === 401) {
        logout();
      }
      
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};