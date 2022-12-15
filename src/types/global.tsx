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
  letter: string
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

export interface IInfoHeader {
  overview?: boolean
  project?: {
    description: string
    title: string
    startDate: string
    endDate: string
    status: string
  }
}
