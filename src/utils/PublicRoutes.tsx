import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProject } from '../hooks/useProject';

export const PublicRoutes: React.FC = () => {
  const { user } = useAuth();

  const { projectId }: { projectId: string } = useProject();

  if (user != null) {
    return <Navigate to={`/project/overview/${projectId}`} />;
  }

  return (
    <Outlet />
  );
};
