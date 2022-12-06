import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { PublicRoutes } from './utils/PublicRoutes';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { PATHS } from './helpers/constants';
import AuthLayout from './components/Layout/AuthLayout';

import ErrorBoundary from './pages/error-pages/ErrorBoundary';
import Error404 from './pages/error-pages/Error404';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ResendConfirmation from './pages/Auth/ResendConfirmation';
import Confirmation from './pages/Auth/Confirmation';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/Profile';
import ChangePassword from './pages/Profile/ChangePassword';
import ProjectOverview from './pages/ProjectOverview';
import { CreateProject } from './pages/Project/Create';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.ROOT} element={<SignIn />} />
          <Route path={PATHS.SIGNIN} element={<SignIn />} />
          <Route path={PATHS.SIGNUP} element={<SignUp />} />
          <Route path={PATHS.RESENDCONFIRMATION} element={<ResendConfirmation />} />
          <Route path={PATHS.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={PATHS.RESTOREPASSWORD} element={<ResetPassword />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes />} errorElement={<ErrorBoundary />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.PROJECT}>
          <Route index element={<CreateProject />} />
          <Route path={PATHS.PROJECTCREATE} element={<CreateProject />} />
        </Route>
        <Route path={PATHS.USERPROFILE} element={<UserProfile />} />
        <Route path={PATHS.CHANGEPASSWORD} element={<ChangePassword />} />
        <Route path={PATHS.PROJECTOVERVIEW} element={<ProjectOverview />} />
      </Route>
      <Route path={PATHS.ERROR_403} element={<Error404 />} />
      <Route path={PATHS.ERROR_500} element={<ErrorBoundary />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace />} />
      <Route path={PATHS.CONFIRMATION} element={<Confirmation />} />
    </>
  )
);
