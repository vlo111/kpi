import { RcFile } from 'antd/lib/upload';
import { FormOptions, UseMutation, Void } from '../../global';
import { IAttachmentSetting } from '../../project';
import { EnumAssessmentFormTypes, INavigateRoteInfoTypes } from '../assessment';
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
  applicants: IApplicantsList[]
  color: string
  courseId: string
  status: string
}

export interface ICourseStatusInfo {
  title: string
  applicationForm: string[]
  courseId: string
  refetchSingleStatus: any
  courseStatus: string
  form: Array<{ id: string, title: string }>
  navigateRouteInfo: INavigateRoteInfoTypes
}

export interface IApplicationFormItem {
  refetchSingleStatus: any
  form: Array<{ id: string, title: string }>
  formType: EnumAssessmentFormTypes
  navigateRouteInfo: INavigateRoteInfoTypes
  courseId: string
  createAssessmentForm: (type: EnumAssessmentFormTypes) => void
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
  dataIndex: number
  key: string
  title: string
  preAssessmentScore: boolean
  preAssessmentSubmitted: boolean
  postAssessmentScore: boolean
  postAssessmentSubmitted: boolean
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

export interface ICreateSubActivityTypes {
  InputActivityId?: string | undefined
  templateId?: string
  projectId?: string | undefined
  refetch?: any
  openCreateSubActivity: boolean
  setOpenCreateSubActivity: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IAssignedUserType {
  email: string
  creator: boolean
  photo: string
  firstname: string
  id: string
  lastname: string
}

export interface IManagerType {
  assignedUsers: IAssignedUserType[]
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

export interface IAssignUserModalTypes {
  open: true
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  subActivityId?: string
}

export interface ICourseInfoCardTypes {
  title: string
  id: string | undefined
  refetch?: any
}

export interface EligibleUsersTypes {
  emailVerified: boolean
  id: string
  firstName: string
  lastName: string
  photo: string
}

export interface IAssignUserParams {
  subActivityId?: string
  userId: string
}

export interface UseGetEligibleUsersResponse {
  data: EligibleUsersTypes[]
  isSuccess: boolean
  refetch: any
  isLoading: boolean
}

export type GetEligibleUsersListBySubActivityId = (
  subActivityId?: string,
  options?: FormOptions
) => UseGetEligibleUsersResponse;

export type AttachFileSubActivity = UseMutation<
Void,
any,
ResponseErrorParam,
IAttachFileSubActivity
>;

export type AssignUserInCourse = UseMutation<
Void,
any,
ResponseErrorParam,
IAssignUserParams
>;
