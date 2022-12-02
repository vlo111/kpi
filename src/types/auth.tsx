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
  createdAt?: string
  deletedAt?: string
  emailVerified?: boolean
  email: string
  firstName: string
  lastName: string
  organization?: string
  phone?: string | null
  photo?: string | null
  position?: string
  updatedAt?: string
  id: string
  accessToken?: string
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
