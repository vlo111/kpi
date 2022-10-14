import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './assets/styles/style'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyle/>
      <App/>
    </AuthProvider>
  </BrowserRouter>
)

reportWebVitals()
