import React from 'react'
import { First } from '../components/Project/Steps/First'
import { Last } from '../components/Project/Steps/Last'
import { CollapseHeader, FormItemName, IManager, ManagerFieldType, ProjectTargetRule } from '../types/project'
import { RuleObject } from 'antd/lib/form'
import { StoreValue } from 'antd/lib/form/interface'
import { Form } from 'antd'
import AsnInput from '../components/Forms/Input'

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
  PROJECTAREA: 'project/steps/:id',
  TEMPLATECREATE: 'template/create',
  PROJECTINFORMATION: 'project-information'
}

export const HEADERS = {
  X_API_VERSION: '1.0'
}

export const Name: FormItemName = (name: string, label: string) => ({
  name: `${name}`,
  label: `${label}`
})

export const ManagerFields: ManagerFieldType = (manager: IManager | null) => [
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
]

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

export const VALIDATE_PROJECT_DETAILS_MESSAGES = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid name',
  // eslint-disable-next-line no-template-curly-in-string
  string: { range: 'The name must be between ${min} and ${max} characters' }
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
    content: <First />
  },
  {
    title: 'Project details',
    content: <Last />
  }
]

export const names = [
  '1.1 Mapping the labor market',
  '1.2 Establishment of educational labs',
  '1.3 Courses and programs',
  '1.4 Establishment of educational labs',
  '1.5 Establishment of educational labs'
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

export const passwordErrorMessage =
  'password must contain at least one digit and at least one character'

export const passwordMinMaxError =
  'password must be between 8 and 64 characters'

export const MenuItems = [
  'Dashboard',
  'Project',
  'Team',
  'Applicants',
  'Product Guide',
  'Keyboard Shortcuts'
]

export const answerTypeOptions: string[] = [
  'Choose answer type',
  'Short Text',
  'Number',
  'Attachment',
  'Dropdown options'
]

export const ProjectInputInitialValue = {
  result_area_form: [
    {
      resultAreaInput: '',
      expectedList: [{}],
      activities: [{ activityInput: '', milestones: [{}] }]
    }
  ]
}

export const TargetRule: ProjectTargetRule = (max) => [
  {
    required: true,
    message: '',
    pattern: /^[0-9]+$/
  },
  () => ({
    async validator (_: RuleObject, value: StoreValue) {
      if (!value) {
        throw new Error('')
      }
      if (isNaN(value)) {
        throw new Error('')
      }
      if (!(value >= 1 && value <= max)) {
        throw new Error('')
      }
      return await Promise.resolve()
    }
  })
]

export const HeaderElement: CollapseHeader = (key, name, index, placeholder, className) => (
  <div key={`${className}${key}`} onClick={(e) => e.stopPropagation()}>
    <Form.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </Form.Item>
  </div>
)
