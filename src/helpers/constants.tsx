
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
  TEAMS: 'teams/',
  PROJECTCREATE: 'create',
  OVERVIEW: 'overview/:id',
  SUBACTIVITY: 'sub-activity/:id',
  PROJECTEDIT: ':id',
  PROJECTS: 'list',
  STEPS: ':id/steps/:index',
  CURRENTSTEP: ':index',
  USERPROFILE: 'user-profile',
  CHANGEPASSWORD: 'change-password',
  PROJECTINFORMATION: 'project-information/:id',
  COURSEINFORMATION: 'course-information/:id',
  ACTIVITYTEMPLATE: 'activity-template/:id',
  FILES: 'files/:id',
  COURSESECTION: 'activity-template/:id/second-step',
  APPLICANT: 'applicant/:id',
  APPLICATIONFORM: 'application/:id',
  APPLYAPPLICANTFORM: 'apply-form/:id'
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
  'Files',
  'Product Guide',
  'Keyboard Shortcuts'
];
export const menuItemsNavigate = [
  '/dashboard',
  '/project/create',
  '/teams',
  '/applicants',
  '/files'
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

export const ApplicantInfo = {
  PersonalTitle: 'Personal details/Անձնական տվյալներ',
  EducationTitle: 'Education & Work/Կրթություն և աշխատանք',
  OtherInfoTitle: 'Other information / Այլ տեղեկություն',
  Birthdate: 'Birthdate',
  Region: 'Region',
  Community: 'Community',
  Gender: 'Gender',
  Student: 'Student',
  EducationLevel: 'Education level',
  PaidJob: 'Paid job',
  WorkOrganisation: 'Work Organisation',
  VulnerabilityType: 'Vulnerability type',
  CourseSource: 'Course Source'
};

export const answerTypeOptions: string[] = [
  'Short Text',
  'Number',
  'Attachment',
  'Dropdown options'
];

export const ApplicantStatus = {
  Applicant: 'Applicant',
  Selection: 'Selection',
  PreAssessment: 'Pre-assessment',
  Participant: 'Participant',
  PostAssessment: 'Post-assessment',
  Trained: 'Trained'
};
export const answerType: string[] = [
  'Select one',
  'Short text',
  'Yes/No',
  'Multiple answers'
];

export const regions: string[] = [
  'Yerevan/Երևան',
  'Aragatsotn/Արագածոտն',
  'Ararat/Արարատ',
  'Armavir/Արմավիր',
  'Gegharkunik/Գեղարքունիք',
  'Kotayk/Կոտայք',
  'Lori/Լոռի',
  'Shirak/Շիրակ',
  'Syunik/Սյունիք',
  'Tavush/Տավուշ',
  'Vayots Dzor/Վայոց Ձոր'
];

export enum AnswerTypes {
  shortText = 'SHORT_TEXT',
  options = 'OPTION',
  checkbox = 'CHECKBOX',
  yesNo = 'YES_NO',
  region = 'region',
}

export enum SectionName {
  personalInfo = 'personal_info',
  educationalInfo = 'educational_info',
  otherInfo = 'other_info',
  professionalInfo = 'professional_info',
}

export enum Placeholders {
  phone = '+(374) XXXXXX',
  date = 'DD/MM/YYYY',
  email = 'yourmail@analysed.ai'
}

export enum KeyName {
  phone = 'phone',
  dob = 'dob',
  email = 'email'
}

export enum ErrorRequireMessages {
  checkbox = 'Please chose one of the fields',
  input = 'Please enter the field'
}

export const defaultLimit = {
  offset: 0,
  limit: 24,
  currentPage: 1
};
