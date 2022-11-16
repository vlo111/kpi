import React from 'react'
// import { Outlet, Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { MainLayout } from '../components/Layout/MainLayout'
// import { PATHS } from '../helpers/constants'

export const PrivateRoutes: React.FC = () => {
  // const token = localStorage.getItem('token')

  return (
  // token ? <MainLayout><Outlet/></MainLayout> : <Navigate to={PATHS.SIGNIN}/>
      <MainLayout><Outlet/></MainLayout>
  )
}
