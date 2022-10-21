import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Error403 from './pages/error-pages/Error403'
import SignIn from './pages/Auth/SignIn'
import ForgotPassword from './pages/Auth/ForgotPassword'
import RecoverPassword from './pages/Auth/ResetPassword'
import { PATHS } from './helpers/constants'
import { PublicRoutes } from './utils/PublicRoutes'
import Root from './pages/Root'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes/>}>
        <Route path={PATHS.SIGNIN} element={<SignIn/>}/>
        <Route path={PATHS.FORGOTPASSWORD} element={<ForgotPassword/>}/>
        <Route path={PATHS.RECOVERPASSWORD} element={<RecoverPassword/>}/>
      </Route>
      <Route path={PATHS.ROOT} element={<Root/>}/>
      <Route path={PATHS.DASHBOARD} element={<Dashboard/>}/>
      <Route path={PATHS.ERROR_403} element={<Error403/>}/>
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace/>}/>
    </>
  )
)
