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
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid ${name}',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Please enter your ${name} in format: yourname@domain.com'
  }
}
