import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './assets/styles/style'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <AppProvider>
      <GlobalStyle/>
      <App/>
    </AppProvider>
  </BrowserRouter>
)

reportWebVitals()
