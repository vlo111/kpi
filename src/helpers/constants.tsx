import React from 'react'
import { Second } from '../components/Project/Steps/Second'
import { Last } from '../components/Project/Steps/Last'
import { FormItemName, IManager, ManagerFieldType } from '../types/project'

export const PATHS = {
  ROOT: '/',
  TEAMS: '/teams',
  ERROR_403: 'no-access',
  CREATEPROJECT: 'create-project',
  SIGNIN: 'sign-in',
  CHANGEPASSWORD: 'change-password',
  FORGOTPASSWORD: 'forgot-password',
  RECOVERPASSWORD: 'reset-password',
  DASHBOARD: 'dashboard',
  TEST: 'test',
  CONFIRMEMAIL: 'confirm-email',
  SIGNUP: 'sign-up',
  USERPROFILE: 'user-profile',
  CHANGEPASSWORDPROFILE: 'change-password-profile',
  CONFIRMEMAILSIGNUP: 'confirm-email/:email',
  OVERVIEW: 'project/overview/:id',
  PROJECTAREA: 'project/steps/:id'
}

export const HEADERS = {
  X_API_VERSION: '1.0'
}

export const Name: FormItemName = (name: string, label: string) => ({
  name: `${name}`,
  label: `${label}`
})

export const ManagerFields: ManagerFieldType = (manager: IManager | null) => ([
  {
    name: ['firstName'],
    value: manager?.firstName
  },
  {
    name: ['lastName'],
    value: manager?.lastName
  },
  {
    name: ['email'],
    value: manager?.email
  },
  {
    name: ['position'],
    value: manager?.position
  },
  {
    name: ['assigned'],
    value: 'Project'
  }
])

export const VALIDATE_MESSAGES = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid ${label}',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Please enter your ${label} in format: yourname@domain.com'
  },
  // eslint-disable-next-line no-template-curly-in-string
  string: { range: '${label} must be between ${min} and ${max} characters' }
}

export const VALIDATE_MESSAGES_PROJECT_INPUT = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '',
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: '',
    max: '',
    range: '',
    len: ''
  }
}

export const PlaceHolderDescription =
  'Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills'

export const PlaceHolderExpectedResult =
    'individuals with improved technical and soft skills following participation in USG-assisted workforce development programs'

export const PlaceHolderActivityMilestone =
    'skill mapping study completed and study report, summarizing findings and recommendations developed.'

export const StepList = [
  {
    title: 'Project Input',
    content: <Second />
  },
  {
    title: 'Project details',
    content: <Last />
  }
]

export const names = [
  '1.1 Mapping the labor market', '1.2 Establishment of educational labs', '1.3 Courses and programs', '1.4 Establishment of educational labs', '1.5 Establishment of educational labs'
]
export const tabNames = [
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Societal perceptions shifted'
  }
]

export const passwordRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,64}$/

export const passwordErrorMessage = 'password must contain at least one digit and at least one character'

export const passwordMinMaxError = 'password must be between 8 and 64 characters'
