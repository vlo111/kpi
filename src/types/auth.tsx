export interface SignUpForm {
  email: string
  firstName: string
  lastName: string
  organization: string
  password: string
  repeatPassword: string
}
export interface SignInForm {
  email: string
  password: string
}
export interface User {
  email: string
  firstName: string
  lastName: string
  organization: string
  id: string
  accessToken: string
}
