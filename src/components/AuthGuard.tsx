
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'clinician';
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole, requireAuth = true }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authentication is not required, render children regardless of auth state
  if (!requireAuth) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userRole = user.profile?.role || 'user';
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on user role
    const redirectPath = userRole === 'admin' 
      ? '/admin/dashboard' 
      : userRole === 'clinician' 
        ? '/clinician/dashboard' 
        : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
