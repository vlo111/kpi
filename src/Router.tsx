import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Error404 from './pages/error-pages/Error404'
import ErrorBoundary from './pages/error-pages/ErrorBoundary'
import SignIn from './pages/Auth/SignIn'
import ForgotPassword from './pages/Auth/ForgotPassword'
import RecoverPassword from './pages/Auth/ResetPassword'
import ConfirmEmail from './pages/Auth/ConfirmMailSignIn'
import SignUp from './pages/Auth/SignUp'
import Applicants from './components/Team/ApplicantsList'
import ConfirmMailSignUp from './pages/Auth/ConfirmMailSignUp'
import { Overview } from './components/Project/Overview'
import { PATHS } from './helpers/constants'
import { PublicRoutes } from './utils/PublicRoutes'
import { CreateProject } from './pages/Project/CreateProject'
import { Project } from './components/Project'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { ProjectSteps } from './pages/Steps'
import UserProfile from './components/Users/UserProfile'
import ChangePassword from './components/Header/ChangePassword'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route path={PATHS.SIGNIN} element={<SignIn />} />
        <Route path={PATHS.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={PATHS.RECOVERPASSWORD} element={<RecoverPassword />} />
        <Route path={PATHS.CONFIRMEMAIL} element={<ConfirmEmail />} />
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route
          path={PATHS.CONFIRMEMAILSIGNUP}
          element={<ConfirmMailSignUp />}
        />
      </Route>
      <Route element={<PrivateRoutes />} errorElement={<ErrorBoundary />}>
        <Route path={PATHS.ROOT} element={<Project />} />
        <Route path={PATHS.TEAMS} element={<Applicants />} />
        <Route path={PATHS.CREATEPROJECT} element={<CreateProject />} />
        <Route path={PATHS.OVERVIEW} element={<Overview />} />
        <Route path={PATHS.PROJECTAREA} element={<ProjectSteps />} />
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.USERPROFILE} element={<UserProfile />} />
        <Route path={PATHS.CHANGEPASSWORDPROFILE} element={<ChangePassword />} />
      </Route>
      <Route path={PATHS.ERROR_403} element={<Error404 />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace />} />
    </>
  )
)
