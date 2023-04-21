import { AssessmentFormOptions, IQuestion } from './api/assessment';
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
  workOrganisation: string
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
  reasonsForRejection: string[]
  preAssessmentScore: string | null
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  files: IFile[]
  applicationForm: true
  preAssessmentMaxScore: number
  preAssessmentForm: boolean
  hasPreAssessmentForm: boolean
  hasPostAssessmentForm: boolean
  postAssessmentMaxScore: number
  postAssessmentScore: string | null
  postAssessmentForm: boolean
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
  applicants: Array<{ id: string, fullName: string }>
  open: string
  onCancel: () => void
}
export interface ImportParams {
  sectionDataId: string
  file: Blob
}

export interface IPreAssessMentForm {
  active: boolean
  authorId: string
  createdAt: string
  deletedAt: null | string
  duplicate: boolean
  id: string
  maximumScore: number
  onlineSignature: boolean
  passingScore: number
  projectId: string
  publish: boolean
  questions: IQuestion[]
  sectionDataId: string
  sectionDataTitle: string
  title: string
  type: string
  updatedAt: string
  userEarnedScore: number
  userAssessedScore: number
  preAssessmentAppliedAt: string
  preAssessmentCheckedAt: string
  postAssessmentAppliedAt: string
  postAssessmentCheckedAt: string
  onlineSignaturePath: string
}
export interface IGetApplicantForm {
  checker: {
    firstName: string
    lastName: string
  }
  email: string
  id: string
  preAssessmentForm: IPreAssessMentForm
  postAssessmentForm: IPreAssessMentForm
  preAssessmentAppliedAt: string
  postAssessmentAppliedAt: string
  preAssessmentCheckedAt: string
  postAssessmentCheckedAt: string
}
export interface IGetApplicantFormResult {
  data: IGetApplicantForm
  isSuccess: boolean
  isLoading: boolean
  refetch: any
}

export type useGetApplicantForm = (id: string, sectionDataId: string, type: string, options?: AssessmentFormOptions) => IGetApplicantFormResult
export type ImportApplicantList = UseMutation<Void, any, ResponseErrorParam, ImportParams>

export type OnNoteHandler = ChangeEventHandler<HTMLTextAreaElement>;

export interface ICourseProps {
  history: IHistory | { id: undefined, status: string }
  applicant: IApplicant
  isFirst: boolean
  isLast: boolean
  isActive: boolean
  isLastInactive: boolean
}

export interface ICourses {
  histories: IHistory[] | Array<{ id: undefined, status: string }>
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
  inactive: boolean
  history: IHistory | { id: undefined, status: string }
}

export interface INoteContent {
  text: string | undefined
  reasonsForRejection: string[] | null
  onClose: (close: boolean) => void
}

export type ShowNote = boolean | string;

export interface IStatus {
  status: string
}

export interface IMove {
  sectionDataId: string
  applicantId: string[]
  status: string
  applicantsId: string | undefined
}

export interface INext {
  applicant: IApplicant
  sectionDataId: string
  isAllowEdit: boolean
}

export type OnUpload = (options: { file: any }) => void;

export interface IApplicantDefaultStatus {
  APPLICANT: string
  SELECTION: string
  PRE_ASSESSMENT: string
  PARTICIPANT: string
  POST_ASSESSMENT: string
  TRAINED: string
  NOT_ENROLLED: string
  DROPPED: string
}

export interface IApplicantAccessStatus {
  Dropped: string
  Trained: string
  NotEnrolled: string
  Applicant: string
  Selection: string
  PreAssessment: string
  Participant: string
  PostAssessment: string
}

export interface IFiles { applicantId: string, history: IHistory }

export interface IApplicantProps {
  applicantId?: string
}

export interface IApplicantPublicForm {
  preview?: boolean
  applicantId?: string
  sectionDataId?: string
  type?: string
}

export interface IErrorMessage {
  response: {
    data: { message: string }
  }
}
