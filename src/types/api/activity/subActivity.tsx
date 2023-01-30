import { RcFile } from 'antd/lib/upload';
import { UseMutation, Void } from '../../global';
import { IAttachmentSetting } from '../../project';
import { ResponseErrorParam } from '../project/get-project';

export interface IDisableType {
  tabDisable?: boolean
  setTabDisable: React.Dispatch<React.SetStateAction<boolean>>
}

export const colors: Array<{ index: number, color: string }> = [
  { index: 0, color: '--primary-light-orange' },
  { index: 1, color: '--secondary-green' },
  { index: 2, color: '--secondary-light-amber' },
  { index: 3, color: '--dark-border-ultramarine' }
];

export interface IDraggerProps {
  text?: string | undefined
  padding?: string | undefined
  defaultFileList?: any
  // setFileList?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  setFileList?: any
  docType?: string
  onRemoveFile?: any
  fileList?: any
  setDefaultFileList?: any
  disabled?: boolean
  setReqDocs?: any
  keyName?: string
}

export interface IApplicantsList {
  id: string
  email: string
  status: string
  fullName: string
}

export interface IApplicantsListFullInfo {
  applicants: IApplicantsList []
  color: string
}

export interface ICourseStatusInfo {
  title: string
  applicationForm: string[]
  courseId: string
  refetchSingleStatus: any
  courseStatus: string
  form: Array<{ id: string, title: string }>
}

export interface IApplicationFormItem {
  refetchSingleStatus: any
  form: Array<{ id: string, title: string }>
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
  id: React.Key
  name: string
  email: string
  status: string
}

export interface IWrapperProps {
  children: React.ReactNode
  className?: string | undefined
  margin?: number | undefined
  color?: string
}

export interface IAttachFileSubActivity {
  id: string
  data: {
    files: string[]
    sectionSettingId?: string
    visible?: boolean
  }
}

export interface IManagerType {
  manager: {
    email: string
    firstName: string
    id: string
    lastName: string
  }
  color: string | undefined
}

export interface ICreateSubActivityProps {
  setOpenCreateSubActivity: React.Dispatch<React.SetStateAction<boolean>>
  openCreateSubActivity?: boolean
  templateId?: string
  inputActivityId?: string
  form?: any
  edit?: boolean
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  initialValues?: any
  onFinish?: any
  onFinishFailed?: any
  attachments?: any
  courseStructure?: string
  projectId?: string
  sectionsCount: number
}

export interface ICourseSettingMap {
  setting: ISetting
}
export interface ISetting {
  type: string
  title: string
  answerType: string | null
}

export interface IUpdateSubActivityData {
  id: string | undefined
  data: any
}

export interface IMultiSections {
  subActivity?: any
  sectionsCount?: number
  attachments: IAttachmentSetting[]
  UploadDoc: any
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
}

export interface ICustomInputs {
  name: Array<string | number>
  UploadDoc: any
  attachments: IAttachmentSetting[]
}

export type AttachFileSubActivity = UseMutation<Void, any, ResponseErrorParam, IAttachFileSubActivity>;
