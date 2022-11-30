import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { router } from './Router';
import { AuthProvider } from './hooks/useAuth';
import GlobalStyle from './assets/styles/style';
import locale from 'antd/lib/locale/hy_AM';
import 'antd/dist/antd.min.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const App: JSX.Element = <>
  <ConfigProvider locale={locale}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </ConfigProvider>
</>;
