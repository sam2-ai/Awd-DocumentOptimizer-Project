'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as api from '../services/api';
import { User, LoginCredentials, UserData } from '../services/api';

const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER: 'LOAD_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  REFRESH_TOKEN: 'REFRESH_TOKEN'
} as const;

type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOGIN_START }
  | { type: typeof AUTH_ACTIONS.LOGIN_SUCCESS; payload: { token: string; user: User } }
  | { type: typeof AUTH_ACTIONS.LOGIN_FAILURE; payload: string }
  | { type: typeof AUTH_ACTIONS.LOGOUT }
  | { type: typeof AUTH_ACTIONS.REGISTER_START }
  | { type: typeof AUTH_ACTIONS.REGISTER_SUCCESS; payload: { token: string | null; user: User | null } }
  | { type: typeof AUTH_ACTIONS.REGISTER_FAILURE; payload: string }
  | { type: typeof AUTH_ACTIONS.LOAD_USER; payload: User }
  | { type: typeof AUTH_ACTIONS.CLEAR_ERROR }
  | { type: typeof AUTH_ACTIONS.REFRESH_TOKEN; payload: { token: string; user: User } };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<api.AuthResponse>;
  register: (userData: UserData) => Promise<api.AuthResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<api.AuthResponse>;
  clearError: () => void;
  isTokenExpired: (token: string | null) => boolean;
}

const getInitialState = (): AuthState => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isLoading: true,
  error: null
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      if (action.payload.token && typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.REFRESH_TOKEN:
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      
      if (!token || isTokenExpired(token)) {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        return;
      }

      try {
        const response = await api.getProfile();
        dispatch({
          type: AUTH_ACTIONS.LOAD_USER,
          payload: response.user
        });
      } catch (error) {
        console.error('Failed to load user:', error);
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await api.loginUser(credentials);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          token: response.token,
          user: response.user
        }
      });
      return response;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = err.response?.data?.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };

  const register = async (userData: UserData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      const response = await api.registerUser(userData);
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: {
          token: null,
          user: null
        }
      });
      return response;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = err.response?.data?.message || 'Registration failed';
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const refreshTokenFn = async () => {
    try {
      const response = await api.refreshToken();
      dispatch({
        type: AUTH_ACTIONS.REFRESH_TOKEN,
        payload: {
          token: response.token,
          user: response.user
        }
      });
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken: refreshTokenFn,
    clearError,
    isTokenExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
