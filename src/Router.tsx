import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements, Navigate,
  Route
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
import { ProjectList } from './pages/Project/List';
import { EditProject } from './pages/Project/Edit';
import { ProjectSteps } from './pages/ProjectSteps';
import ProjectInformation from './pages/ProjectInformation';
import SubActivity from './pages/SubActivityes';
import CourseInformation from './pages/SubActivityes/CourseInformation';
import ActivityTemplate from './pages/ActivityTemplate';
import CourseSection from './pages/CourseSection';
import Files from './pages/Files';
import Applicant from './pages/Applicant';
import Application from './pages/Application';
import CreateAssessmentForm from './pages/Assessment';
import UsersTeam from './components/Team/TeamMembesList';
import FillApplicationForm from './pages/ApplicationPublicForm';
import AssessMentForm from './pages/FillAssessmentForm';
import FilledOutAssessmentForm from './pages/FilledOutAssessmentForm';
import ApplicantsData from './pages/Applicatns';
import Invitation from './pages/Auth/Invitation';
import SubActivitiesList from './pages/SubActivitiesList';
import AddSubActivity from './pages/AddSubActivity';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.ROOT} element={<SignIn />} />
          <Route path={PATHS.INVITATION} element={<Invitation />} />
          <Route path={PATHS.SIGNIN} element={<SignIn />} />
          <Route path={PATHS.SIGNUP} element={<SignUp />} />
          <Route path={PATHS.RESENDCONFIRMATION} element={<ResendConfirmation />} />
          <Route path={PATHS.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={PATHS.RESTOREPASSWORD} element={<ResetPassword />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes />} errorElement={<ErrorBoundary />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.SUB_ABCTIVITIES}>
          <Route path={PATHS.ADDSUBACTIVITY} element={<AddSubActivity />} />
          <Route path={PATHS.SUBACTIVITIES} element={<SubActivitiesList />} />
        </Route>
        <Route path={PATHS.TEAMS} element={<UsersTeam />} />
        <Route path={PATHS.PROJECT}>
          {/* <Route index element={<CreateProject />} /> */}
          <Route path={PATHS.PROJECTCREATE} element={<CreateProject />} />
          <Route path={PATHS.PROJECTEDIT} element={<EditProject />} />
          <Route path={PATHS.PROJECTS} element={<ProjectList />} />
          <Route path={PATHS.STEPS} element={<ProjectSteps />} />
          <Route path={PATHS.OVERVIEW} element={<ProjectOverview />} />
          <Route path={PATHS.FILES} element={<Files />} />
          <Route path={PATHS.SUBACTIVITY} element={<SubActivity />} />
        </Route>
        <Route path={PATHS.PROJECTINFORMATION} element={<ProjectInformation />} />
        <Route path={PATHS.COURSEINFORMATION} element={<CourseInformation />} />
        <Route path={PATHS.USERPROFILE} element={<UserProfile />} />
        <Route path={PATHS.CHANGEPASSWORD} element={<ChangePassword />} />
        <Route path={PATHS.ACTIVITYTEMPLATE} element={<ActivityTemplate />} />
        <Route path={PATHS.COURSESECTION} element={<CourseSection />} />
        <Route path={PATHS.APPLICANT} element={<Applicant />} />
        <Route path={PATHS.APPLICATIONFORM} element={<Application />} />
        <Route path={PATHS.APPLICANTS} element={<ApplicantsData />} />
        <Route path={PATHS.ASSESSMENTFORMCREATE} element={<CreateAssessmentForm />} />
      </Route>
      <Route element={<PrivateRoutes path={PATHS.FILLEDOUTASSESSMENTFORM} />} errorElement={<ErrorBoundary />}>
        <Route path={PATHS.FILLEDOUTASSESSMENTFORM} element={<FilledOutAssessmentForm />} />
      </Route>
      <Route path={PATHS.APPLYAPPLICANTFORM} element={<FillApplicationForm />} />
      <Route path={PATHS.ERROR_403} element={<Error404 />} />
      <Route path={PATHS.ERROR_500} element={<ErrorBoundary />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR_403} replace />} />
      <Route path={PATHS.CONFIRMATION} element={<Confirmation />} />
      <Route path={PATHS.ASSESSMENTFORM} element={<AssessMentForm />} />
    </>
  )
);
