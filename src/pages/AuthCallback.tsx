import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye } from 'lucide-react';

const AuthCallback = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Handle the auth callback
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('Auth error:', error);
        // Redirect to auth page with error
        window.location.href = '/auth';
        return;
      }

      if (code) {
        // The auth context will handle the session automatically
        console.log('Auth callback received');
      }
    };

    handleAuthCallback();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4 animate-pulse">
            <Eye className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Signing you in...</h2>
          <p className="text-muted-foreground">Please wait while we authenticate your account</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    const role = user.profile?.role || 'user';
    const redirectPath = role === 'admin' 
      ? '/admin/dashboard' 
      : role === 'clinician' 
        ? '/clinician/dashboard' 
        : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Navigate to="/auth" replace />;
};

export default AuthCallback;