import SignIn from '../pages/Auth/SignIn';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { PublicRoutes } from '../utils/PublicRoutes';
import AuthLayout from '../components/Layout/AuthLayout';
import { PATHS } from '../helpers/constants';
import { PrivateRoutes } from '../utils/PrivateRoutes';
import ErrorBoundary from '../pages/error-pages/ErrorBoundary';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/error-pages/Error404';
import Confirmation from '../pages/Auth/Confirmation';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/hy_AM';
import { AuthProvider } from '../hooks/useAuth';
import GlobalStyle from '../assets/styles/style';
import '../__mocks__/MatchMedia';
import '@testing-library/jest-dom/extend-expect';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.ROOT} element={<SignIn />} />
          <Route path={PATHS.SIGNIN} element={<SignIn />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes />} errorElement={<ErrorBoundary />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
      </Route>
      <Route path={PATHS.ERROR_403} element={<Error404 />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace />} />
      <Route path={PATHS.CONFIRMATION} element={<Confirmation />} />
    </>
  )
);

export const RenderRouter: () => JSX.Element = () => (
  <ConfigProvider locale={locale}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </ConfigProvider>
);
