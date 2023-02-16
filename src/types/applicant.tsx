import { AssessmentFormOptions, IQuestion } from './api/assessment';

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

interface GetApplicant {
  isLoading: boolean
  applicant: IApplicantData
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
}
export interface IGetApplicantForm {
  email: string
  id: string
  preAssessmentForm: IPreAssessMentForm
}
export interface IGetApplicantFormResult {
  data: IGetApplicantForm
  isSuccess: boolean
  isLoading: boolean
  refetch: any
}
export type UseGetApplicant = (id: string | undefined) => GetApplicant
export type useGetApplicantForm = (id: string, sectionDataId: string, type: string, options?: AssessmentFormOptions) => IGetApplicantFormResult
