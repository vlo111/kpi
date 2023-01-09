import { RcFile } from 'antd/lib/upload';
import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';

export interface IDisableType {
  tabDisable?: boolean
  setTabDisable: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IDraggerProps {
  text?: string | undefined
  padding?: string | undefined
  // setFileList?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  setFileList?: any
}

export interface UploadRequestError extends Error {
  status?: number
  url?: string
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: any) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  // onSuccess?: (body: T, xhr?: XMLHttpRequest) => void
  onSuccess?: any
  data?: Record<string, unknown>
  file: Exclude<any, File | boolean> | RcFile
}

export interface IUserListTypes {
  key: React.Key
  name: string
  email: string
  status: string
}

export interface IWrapperProps {
  children: React.ReactNode
  className?: string | undefined
  margin?: number | undefined
}

export interface IAttachFileSubActivity {
  id: string
  data: {
    files: string[]
    sectionSettingId: string
  }
}

export interface IManagerType {
  manager: {
    email: string
    firstName: string
    id: string
    lastName: string
  }
}

export interface ICreateSubActivityProps {
  templateId?: string | undefined
  subActivityId?: string | undefined
}

export type AttachFileSubActivity = UseMutation<Void, any, ResponseErrorParam, IAttachFileSubActivity>;
