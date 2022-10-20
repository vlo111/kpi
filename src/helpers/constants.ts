export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  SIGNIN: 'sign-in',
  CHANGEPASSWORD: 'change-password',
  FORGOTPASSWORD: 'forgot-password',
  RECOVERPASSWORD: 'recover-password',
  DASHBOARD: 'dashboard',
  TEST: 'test'
}

export const HEADERS = {
  X_API_VERSION: '1.0'
}

export const VALIDATE_MESSAGES: any = {
  required: '${label}ը պարտադիր է',
  types: {
    email: '${label} դաշտը վավեր չէ',
    number: '${label} դաշտը վավեր չէ'
  },
  number: {
    range: '${label}ը պետք է լինի ${min} և ${max}'
  }
}
