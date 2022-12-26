import { OpenDeleteResultModal } from './project';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface IAnsAlert {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  email?: string
}

export type TVoid = (params?: any) => void

export interface ConfirmModalType {
  open: boolean | OpenDeleteResultModal
  title: string
  yes: string
  no: string
  closable?: boolean
  onSubmit: () => void
  onCancel: () => void
  styles?: { gap: string }
}

export type FormFinish = (errorInfo: any) => void

export interface IAvatarTypes {
  letter: string | React.ReactElement
  size?: number
  src?: string | undefined | null
}

export type Void = () => void

export interface IQueryData {
  isLoading: false | true
  error: Error | null
  status: 'error' | 'success' | 'loading'
}

export type Mutate<RequestData, ResponseErrorData> = UseMutateFunction<
unknown,
{
  response: {
    status: number
    data: ResponseErrorData
  }
},
RequestData,
unknown
>;

export type UseMutation<Success, Error, ResponseErrorData, RequestData> = (
  options: {} | { onSuccess: Success, onError: Error }
) => {
  mutate: Mutate<RequestData, ResponseErrorData>
  isLoading: boolean
};

export interface IBreadcrumb {
  path: string
  breadcrumbName: string
}
export interface IInfoHeader {
  overview?: boolean
  project?: {
    id: string
    description: string
    title: string
    startDate: string
    endDate: string
    status: string
  }
  padding?: string
  activity?: any
}

export type Onchange = (newOpen: boolean) => void
export type StringVoidType = (id: string) => void

export interface IAsnCheckbox {
  width?: string
  height?: string
  top?: string
  left?: string
  checkWidth?: string
  checkHeight?: string
  borderSize?: string
}
