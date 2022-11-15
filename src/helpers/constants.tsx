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
  Overview: 'overview',
  ProjectInfo: 'project-info'
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
  },
  {
    name: 'Skill gap reduced smnfioewbF VCFUIEWQ'
  },
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
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  }
]

export const generalInfo = [
  {
    title: 'Title',
    description: 'AWDA'
  },
  {
    title: 'Description',
    description: `Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
    Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills`
  },
  {
    title: 'Start Date',
    description: '10/11/21'
  },
  {
    title: 'End Date',
    description: '10/10/26'
  }
]
export const resultAndActivities = [
  {
    option: 'OP1.1',
    count: '1000',
    description: 'individuals with improved technical and soft skills following participation in USG-assisted workforce development programs'
  },
  {
    option: 'OP1.2',
    count: '50',
    description: 'vulnerable persons including persons with disabilities (PWD) benefiting from U.S. Government supported work-based training and dual education programs'
  },
  {
    option: 'OP1.3',
    count: '50%',
    description: 'female participants in USG-assisted programs '
  },
  {
    option: 'OP1.4',
    count: '20',
    description: 'service providers trained who serve vulnerable persons'
  },
  {
    option: 'OP1.5',
    count: '1',
    description: 'U.S. Government‐assisted organization and/or service delivery system that serves vulnerable persons strengthened'
  }
]
