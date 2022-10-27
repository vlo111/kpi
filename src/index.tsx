import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './assets/styles/style'
import Root from './Root'
import { Providers } from './utils/Providers'

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <>
    <Providers>
      <GlobalStyle />
      <Root />
    </Providers>
  </>
)

reportWebVitals()
