import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './assets/styles/style';
import { Providers } from './utils/providers/Providers';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <>
        <GlobalStyle />
        <Providers>
        </Providers>
    </>
);

reportWebVitals();
