import { ChangeEventHandler } from 'react';
import { TabsProps } from 'antd';
import { UploadRequestOption } from './api/activity/subActivity';

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

interface IGetApplicant { isLoading: false | true, applicant: IApplicant }

export type UseGetApplicant = (id: string) => IGetApplicant | undefined

export interface IApproveModalProps {
  applicant: IApplicant
  open: string
  onCancel: () => void
}

export type OnNoteHandler = ChangeEventHandler<HTMLTextAreaElement>;

export interface ICourseProps {
  history: IHistory
  applicant: IApplicant
  isLast: boolean
  isActive: boolean
}

export interface ICourses {
  histories: IHistory[]
  applicant: IApplicant
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
}

export type OnUpload = (options: { file: any }) => void;
