import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth: React.FC = () => {
  const { auth } = useAuth()

  const location = useLocation()
  return auth?.user == null ? <Navigate to="/sign/in" state={{ from: location }} replace/> : <Outlet/>
}

export default RequireAuth
