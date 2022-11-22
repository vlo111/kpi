export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  SIGNIN: 'sign-in',
  SIGNUP: 'sign-up',
};

export const VALIDATE_MESSAGES = {
  required: 'Պարտադիր դաշտ',
  types: {
    email: '${label} դաշտը վավեր չէ',
    number: '${label} դաշտը վավեր չէ',
  },
  number: {
    range: '${label}ը պետք է լինի ${min} և ${max}',
  },
};