'use client';

import React, { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }

    if (!requireAuth && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, requireAuth, router, pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    return <LoadingSpinner />;
  }

  if (!requireAuth && isAuthenticated) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
