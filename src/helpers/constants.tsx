import React from 'react'
import GeneralInfo from '../components/Project/Steps/GeneralInfo'
import ProjectInfo from '../components/Project/Steps/ProjectInput'
import { ProjectDetails } from '../components/Project/Steps/ProjectDetails'

export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  SIGNIN: 'sign-in',
  CHANGEPASSWORD: 'change-password',
  FORGOTPASSWORD: 'forgot-password',
  RECOVERPASSWORD: 'reset-password',
  DASHBOARD: 'dashboard',
  TEST: 'test',
  ConfirmEmail: 'confirm-email',
  SIGNUP: 'sign-up',
  ConfirmEmailSignUp: 'confirm-email/:email'
}

export const HEADERS = {
  X_API_VERSION: '1.0'
}

export const VALIDATE_MESSAGES: any = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid ${name}',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Please enter your ${name} in format: yourname@domain.com'
  }
}

export const PlaceHolderDescription = 'Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills'

export const StepList = [
  {
    title: 'General info',
    content: <GeneralInfo />
  },
  {
    title: 'Project input',
    content: <ProjectInfo />
  },
  {
    title: 'Project details',
    content: <ProjectDetails />
  }
]
