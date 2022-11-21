import React from 'react';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
  // const token = localStorage.getItem('token')

  return (
    <Outlet/>
  )
}
