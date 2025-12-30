'use client';

import { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { getHealth } from '@/services/api';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    getHealth()
      .then((status) => console.log('backend health', status))
      .catch((err) => console.error('health check failed', err));
  }, []);

  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />
    </AuthProvider>
  );
}
