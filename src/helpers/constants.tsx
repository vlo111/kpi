import React from 'react'
import { FirstStep } from '../components/Project/Steps/First'
import { Second } from '../components/Project/Steps/Second'
import { Last } from '../components/Project/Steps/Last'
import { FormItemName, IManager, ManagerFieldType } from '../types/project'

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
  ConfirmEmailSignUp: 'confirm-email/:email',
  Overview: 'overview'
}

export const HEADERS = {
  X_API_VERSION: '1.0'
}

export const Name: FormItemName = (name: string) => ({
  name: `${name}`,
  label: `${name}`
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
  required: 'Please enter a valid ${name}',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Please enter your ${name} in format: yourname@domain.com'
  }
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
    title: 'General Info',
    content: <FirstStep />
  },
  {
    title: 'Project Input',
    content: <Second />
  },
  {
    title: 'Project details',
    content: <Last />
  }
]
