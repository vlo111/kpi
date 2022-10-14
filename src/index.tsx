import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './assets/styles/style'

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
    <>
        <GlobalStyle/>
        <App/>
    </>
)

reportWebVitals()
