import React from 'react';
import { Navigate } from 'react-router-dom';

interface GuestRouteProps {
  children: React.ReactNode;
}


const GuestRoute = ({ children }: GuestRouteProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
