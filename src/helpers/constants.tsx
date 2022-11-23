export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  SIGNIN: 'sign-in',
  SIGNUP: 'sign-up',
  CONFIRMEMAILSIGNUP: 'confirm-email/:email'
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
    mismatch: 'Password must contain at least one digit and at least one character'
  }
};

export const passwordRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,64}$/;
