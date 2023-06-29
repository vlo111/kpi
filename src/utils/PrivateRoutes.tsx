import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { PATHS } from '../helpers/constants';
import { MainLayout } from '../components/Layout/MainLayout';

export const PrivateRoutes: React.FC<{ path?: string }> = ({ path }) => {
  const [projectOverview, setProjectOverview] = useState({
    areaOrder: undefined,
    activityId: undefined,
    activityTitle: undefined,
    resultAreaTitle: undefined,
    templateTab: undefined
  });
  const token = localStorage.getItem('token');
  return (
    (token !== 'null') ? PATHS.FILLEDOUTASSESSMENTFORM === path ? <Outlet /> : <MainLayout><Outlet context={{ projectOverview, setProjectOverview }} /></MainLayout> : <Navigate to={`/${PATHS.SIGNIN}`} />
  );
};
