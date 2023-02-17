import { ChangeEventHandler } from 'react';
import { TabsProps } from 'antd';
import { UseMutation, Void } from './global';
import { ResponseErrorParam } from './api/project/get-project';

export interface IApplicant {
  id: string
  fullName: string
  phone: string
  email: string
  dob: string
  region: string
  community: string
  gender: string
  student: string
  studyType: string
  educationLevel: string
  profession: string
  position: string
  income: string
  workOrganization: string
  vulnerabilities: string
  informedAboutUs: string
  disability: string
  incomeBool: string
  studentBool: string
  disabilityBool: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IApplicantData {
  applicant: IApplicant
  courses: ICourse[]
}

export interface ICourse {
  title: string
  sectionDataId: string
  history: IHistory[]
}

export interface IHistory {
  id: string
  sectionDataId: string
  applicantId: string
  userId: string
  note: string
  reasonsForRejection: string
  preAssessmentScore?: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  files: IFile[]
  applicationForm: true
}

export interface IFile {
  path: string
  name: string
  originalName: string
  type: string
}

interface IGetApplicant { isLoading?: boolean, applicant: IApplicant, courses: ICourse[] }

export type UseGetApplicant = (id: string | undefined) => IGetApplicant | undefined

export interface IApproveModalProps {
  applicant: IApplicant
  open: string
  onCancel: () => void
}
export interface ImportParams {
  sectionDataId: string
  file: Blob
}

export type ImportApplicantList = UseMutation<Void, any, ResponseErrorParam, ImportParams>

export type OnNoteHandler = ChangeEventHandler<HTMLTextAreaElement>;

export interface ICourseProps {
  history: IHistory
  applicant: IApplicant
  isLast: boolean
  isActive: boolean
  applicantId: string | undefined
}

export interface ICourses {
  histories: IHistory[]
  applicant: IApplicant
  applicantId: string | undefined
}

export interface IStyle {
  color?: string
}

export interface ApplicantRow {
  width?: number
  height?: number
}

export type SetValue = (key: string, value: string | undefined) => JSX.Element;

export type StatusItems = TabsProps['items'];

export interface IApplicantTabs {
  courses: ICourse[]
  applicant: IApplicant
  applicantId: string | undefined
}

export interface INote {
  id: string
  text: string
  inactive: boolean
}

export type ShowNote = boolean | string;

export interface IStatus {
  status: string
}

export interface IMove {
  sectionDataId: string
  applicantId: string
  status: string
}

export interface INext {
  applicant: IApplicant
  sectionDataId: string
  isAllowEdit: boolean
  applicantId: string | undefined

}

export type OnUpload = (options: { file: any }) => void;

export interface IApplicantDefaultStatus {
  APPLICANT: string
  SELECTION: string
  PRE_ASSESSMENT: string
  PARTICIPANT: string
  POST_ASSESSMENT: string
  TRAINED: string
}

export interface IApplicantAccessStatus {
  Dropped: string
  Trained: string
  NotEnrolled: string
}

export interface IFiles { applicantId: string, history: IHistory }

export interface IApplicantProps {
  applicantId?: string
}
