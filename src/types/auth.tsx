import { RcFile } from 'antd/lib/upload';
import { ReactNode } from 'react';
import { UseMutation, Void } from './global';

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
  projects: Array<{
    id: string
    permissionType: string
  }>
}

export interface ISuccessMessage {
  data: {
    result: string
  }
}
export interface ITokenMessage {
  response: {
    data: { message: string }
  }
}

export interface IResetPassword {
  password: string
  confirmPassword: string
}

export interface IUserUpload {
  result?: string[]
  data: { result: string[] }
}
export interface IUploadProps {
  children?: ReactNode
  customRequest?: (options: { file: string | Blob | RcFile }) => void
  name?: string
  accept?: string
  showUploadList?: boolean
  onRemove?: (file: any) => void
}

export type UploadSuccessResponse = (response: { result: string[] }) => void;

export type UploadErrorResponse = () => void;

export type UserImageUpload = UseMutation<
Void,
UploadErrorResponse,
UploadSuccessResponse,
string | Blob | RcFile
>;
