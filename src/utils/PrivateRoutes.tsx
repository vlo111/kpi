import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { PATHS } from '../helpers/constants';
import { MainLayout } from '../components/Layout/MainLayout';

export const PrivateRoutes: React.FC<{ path?: string }> = ({ path }) => {
  const token = localStorage.getItem('token');
  return (
    (token !== 'null') ? PATHS.FILLEDOUTASSESSMENTFORM === path ? <Outlet /> : <MainLayout><Outlet /></MainLayout> : <Navigate to={`/${PATHS.SIGNIN}`} />
  );
};
