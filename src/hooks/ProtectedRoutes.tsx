import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './Auth'

export const ProtectRoutes: React.FC = () => {
  const { cookies } = useAuth()

  return cookies.token ? <Outlet/> : <Navigate to='/sign/sign-in' replace={true} />
}
