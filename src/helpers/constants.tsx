export const PATHS = {
  ROOT: '/',
  ERROR_403: 'no-access',
  SIGNIN: 'sign-in',
  SIGNUP: 'sign-up'
};

export const VALIDATE_MESSAGES = {
  required: 'Պարտադիր դաշտ',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: '${label} դաշտը վավեր չէ',
    // eslint-disable-next-line no-template-curly-in-string
    number: '${label} դաշտը վավեր չէ'
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: '${label}ը պետք է լինի ${min} և ${max}'
  }
};
