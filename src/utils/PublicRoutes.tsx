import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const PublicRoutes: React.FC = () => {
  const { user } = useAuth();

  if (user != null) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Outlet />
  );
};
