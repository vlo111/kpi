export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  ERROR_500: 'error-500',
  SIGNIN: 'sign-in',
  SIGNUP: 'sign-up',
  RESENDCONFIRMATION: 'resend-confirmation/:email',
  CONFIRMATION: 'confirm-email',
  FORGOTPASSWORD: 'forgot-password',
  RESTOREPASSWORD: 'restore-password',
  DASHBOARD: 'dashboard',
  PROJECT: 'project',
  PROJECTCREATE: 'create',
  OVERVIEW: 'overview/:id',
  PROJECTEDIT: ':id',
  PROJECTS: 'list',
  STEPS: ':id/steps/:index',
  CURRENTSTEP: ':index',
  USERPROFILE: 'user-profile',
  CHANGEPASSWORD: 'change-password',
  PROJECTINFORMATION: 'project-information/:id'
};

export const VALIDATE_MESSAGES = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid ${label}',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Please enter your ${label} in format: yourname@domain.com'
  },

  pattern: {
    // eslint-disable-next-line no-template-curly-in-string
    mismatch:
      'Password must contain at least one uppercase character, one lowercase character and one digit '
  }
};
export const MenuItems = [
  'Dashboard',
  'Project',
  'Team',
  'Applicants',
  'Product Guide',
  'Keyboard Shortcuts'
];
export const menuItemsNavigate = [
  '/dashboard',
  '/project/create',
  '/teams',
  '/applicants'
];

export const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
export const phoneRegExp = /^[+][(][0-9]{1,5}[)][-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,12}$/im;
export const phoneErrorMesage = 'Please enter your phone in format: +(374) XXXXXX';

export const VALIDATE_EMPTY = {
  firstName: 'Please enter a valid Email Address',
  lastName: 'Please enter a valid Last Name',
  email: 'Please enter a valid Email Address',
  organisation: 'Please enter a valid Organisation Name',
  password: 'Please enter a valid Password',
  confirm: 'Please enter a valid Confirm Password'
};

export const VALIDATE_FILLED = {
  firstName: "'firstName' must be between 3 and 128 characters",
  lastName: "'lastName' must be between 3 and 128 characters",
  email: 'Please enter your Email Address in format: yourname@domain.com',
  organisation: "'organization' must be between 2 and 128 characters",
  password: "'password' must be between 8 and 16 characters",
  confirm: "'repeatPassword' must be between 8 and 64 characters"
};

export const ProjectSteps = {
  First: 0,
  Last: 1
};
