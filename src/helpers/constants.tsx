import React from 'react'
import { First } from '../components/Project/Steps/first'
import { Second } from '../components/Project/Steps/second'
import { Last } from '../components/Project/Steps/last'
import { FormItemName } from '../types/project'

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

export const Name: FormItemName = (name) => ({ name: `${name}`, label: `${name}` })

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
    title: 'General Info',
    content: <First />
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
