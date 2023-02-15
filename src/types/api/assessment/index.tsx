import { UseMutation, Void } from '../../global';
import { IOnlyId } from '../activity/template';
import { ResponseErrorParam } from '../project/get-project';

export interface AssessmentFormData {
  result: AssessmentFormResult[]
}

export interface UseAssessmentFormResult {
  data: Result[]
  isSuccess: boolean
  refetch: any
  isLoading: boolean
}

export interface AssessmentFormOptions {
  enabled: boolean
}

export interface AssessmentFormResult {
  id: string
  title: string
  active: boolean
  type: AssessmentFormType
}

enum AssessmentFormType {
  PRE_ASSESSMENT,
  POST_ASSESSMENT,
  APPLICATION
}

export type EnumAssessmentFormTypes = keyof typeof AssessmentFormType;

enum AssessmentFormAnswers {
  OPTION,
  SHORT_TEXT,
  CHECKBOX
}

type enumAssessmentFormAnswers = keyof typeof AssessmentFormAnswers;

export interface Result {
  id?: string
  authorId?: string
  projectId?: string
  sectionDataId?: string
  sectionDataTitle?: string
  title: string
  onlineSignature: boolean
  active?: boolean
  publish?: boolean
  passingScore: number
  maximumScore: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  duplicate?: boolean
  type: EnumAssessmentFormTypes
  questions: Question[]
}

export interface Question {
  id?: string
  title: string
  required: boolean
  score: number
  answerType: string
  answers: Answer[]
}

export interface Answer {
  id?: string
  title: string
  score: number
  type: enumAssessmentFormAnswers
}

export interface AssessmentFormDataResponseOneItem {
  result: Result
}

export interface CreateAssessmentFormData {
  courseId: string
  data: Result
}

export interface UpdateAssessmentFormData {
  formId: string
  data: Result
}

export interface UseAssessmentFormSingleResult {
  data: Result[]
  isSuccess: boolean
  refetch: any
  isLoading: boolean
}

export interface CreateAssessmentIfoModalTypes {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  type: EnumAssessmentFormTypes
  projectId: string
  courseId: string
  navigateRouteInfo: INavigateRoteInfoTypes
}

export interface INavigateRoteInfoTypes {
  projectId: string
  courseId: string
  courseTitle: string
  resultAreaTitle: string
  inputActivityTitle: string
}
export type GetAssessmentFormByCourseId = (
  courseId: string,
  params: {
    type: EnumAssessmentFormTypes
  },
  options?: AssessmentFormOptions
) => UseAssessmentFormResult;

export type GetSingleAssessmentForm = (
  formId: string,
  options?: AssessmentFormOptions
) => UseAssessmentFormResult;

export type GetAssessmentFormByProjectId = (
  projectId: string,
  params: {
    type: EnumAssessmentFormTypes
  },
  options?: AssessmentFormOptions
) => UseAssessmentFormSingleResult;

export type CreateAssessmentFormByCourseId = UseMutation<Void, any, ResponseErrorParam, CreateAssessmentFormData>;
export type UpdateAssessmentFormByFormId = UseMutation<Void, any, ResponseErrorParam, UpdateAssessmentFormData>;
export type DeleteAssessmentFormByFormId = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;
export type DuplicateAssessmentFormByFormId = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;
export type ChangeStatusAssessmentFormByFormId = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;

export interface IAssessmentSelectItem {
  name: string
  value: string
}

export interface IButtonContainer {
  marginTop?: string
}
