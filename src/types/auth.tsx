export interface SignUpForm {
  email: string
  firstName: string
  lastName: string
  organization: string
  password: string
  repeatPassword: string
}
export interface ISignInForm {
  email: string
  password: string
}
export interface IUser {
  email: string
  firstName: string
  lastName: string
  organization?: string
  id: string
  accessToken: string
}

export interface ISuccessMessage {
  data: {
    result: string
  }
}

export interface IResetPassword {
  password: string
  confirmPassword: string
}
