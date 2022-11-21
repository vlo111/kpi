import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { PublicRoutes } from './utils/routes/PublicRoutes';
import { PrivateRoutes } from './utils/routes/PrivateRoutes';
import { PATHS } from './helpers/constants';
import ErrorBoundary from './pages/error-pages/ErrorBoundary';
import Error404 from './pages/error-pages/Error404';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
      </Route>
      <Route element={<PrivateRoutes />} errorElement={<ErrorBoundary />}>
      </Route>
      <Route path={PATHS.ERROR_403} element={<Error404 />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace />} />
    </>
  )
);
