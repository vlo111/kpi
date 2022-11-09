import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  console.error(error)
  return (
        <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
              paddingTop: '18vh'
            }}
        >
            <h2 style={{ fontSize: '150px' }}>Error</h2>
            <p>Error Happened</p>
        </div>
  )
}

export default ErrorBoundary
