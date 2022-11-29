import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';

export const PrivateRoutes: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    (token != null) ? <MainLayout><Outlet /></MainLayout> : <Navigate to="/sign-in" />
  );
};
