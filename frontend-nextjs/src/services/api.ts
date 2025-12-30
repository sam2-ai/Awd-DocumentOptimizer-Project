import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post('/api/refresh');
        const newToken = refreshResponse.data.token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', newToken);
        }
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country?: string;
  agreeToTerms?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface HealthResponse {
  status: string;
  services: {
    server: { status: string; message?: string };
    database: { status: string; message?: string };
  };
  system?: {
    uptime: number;
    memory?: { usagePercent: number };
  };
}

export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  const response = await api.post('/api/register', userData);
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await api.post('/api/logout');
  return response.data;
};

export const getProfile = async (): Promise<{ user: User }> => {
  const response = await api.get('/api/profile');
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await api.post('/api/refresh');
  return response.data;
};

export const getHealth = async (): Promise<HealthResponse> => {
  const response = await api.get('/health');
  return response.data;
};

export const getDetailedHealth = async (): Promise<HealthResponse> => {
  const response = await api.get('/health/detailed');
  return response.data;
};

export const updateProfile = async (userData: Partial<UserData>): Promise<{ user: User }> => {
  const response = await api.put('/api/profile', userData);
  return response.data;
};

export const changePassword = async (passwordData: { currentPassword: string; newPassword: string }): Promise<{ message: string }> => {
  const response = await api.put('/api/change-password', passwordData);
  return response.data;
};

export const uploadDocument = async (formData: FormData): Promise<{ document: unknown }> => {
  const response = await api.post('/api/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getDocuments = async (params = {}): Promise<{ documents: unknown[] }> => {
  const response = await api.get('/api/documents', { params });
  return response.data;
};

export const getDocument = async (id: string): Promise<{ document: unknown }> => {
  const response = await api.get(`/api/documents/${id}`);
  return response.data;
};

export const deleteDocument = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/api/documents/${id}`);
  return response.data;
};

export const getDashboardStats = async (): Promise<unknown> => {
  const response = await api.get('/api/analytics/dashboard');
  return response.data;
};

export const getUsageStats = async (period = '7d'): Promise<unknown> => {
  const response = await api.get(`/api/analytics/usage?period=${period}`);
  return response.data;
};

export default api;
