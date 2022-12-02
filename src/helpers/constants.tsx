
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
  USERPROFILE: 'user-profile',
  CHANGEPASSWORD: 'change-password'
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
    mismatch: 'Password must contain at least one uppercase character, one lowercase character and one digit '
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
  '/project',
  '/teams',
  '/applicants'
];

export const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
