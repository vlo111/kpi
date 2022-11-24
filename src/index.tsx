import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import reportWebVitals from './reportWebVitals';
import { router } from './Router';
import { AuthProvider } from './hooks/useAuth';
import GlobalStyle from './assets/styles/style';
import locale from 'antd/lib/locale/hy_AM';
import 'antd/dist/antd.min.css';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

// eslint-disable-next-line no-template-curly-in-string
root.render(
  <>
    <ConfigProvider locale={locale}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ConfigProvider>
  </>
);

reportWebVitals();
