import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';

export const PrivateRoutes: React.FC = () => {
  const token: string | null = localStorage.getItem('token');

  console.log('token', typeof token);

  return (
    token !== 'null' ? <MainLayout><Outlet /></MainLayout> : <Navigate to="/sign-in" />
  );
};
