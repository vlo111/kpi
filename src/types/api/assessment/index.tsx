import { Dispatch, SetStateAction } from 'react';
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
export interface IResult {
  id: string
  authorId: string
  projectId: string
  sectionDataId: string
  sectionDataTitle: string
  title: string
  onlineSignature: boolean
  active: boolean
  publish: boolean
  passingScore: number
  maximumScore: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  duplicate: boolean
  type: string
  questions: IQuestion[]
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

export interface IAnswer {
  id: string
  title: string
  score: number
  type: string
  checked: boolean
  text: string
  userEarnedScore: number
}
export interface AssessmentFormDataResponseOneItem {
  result: Result
}

export interface CreateAssessmentFormData {
  id: string | undefined
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
export interface IAssessments {
  id: string
  title: string
  type: string
  active: boolean
}

export interface CreateAssessmentIfoModalTypes {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  type: EnumAssessmentFormTypes
  projectId: string
  courseId: string
  navigateRouteInfo: INavigateRoteInfoTypes
  setOpenPreviewAssessmentModal: React.Dispatch<React.SetStateAction<boolean>>
  footerButtons: IAssessments | undefined
  setFooterButtons: Dispatch<SetStateAction<undefined | IAssessments>>
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

export interface IGetAssessmentForm {
  data: { result: IResult }
  isSuccess: boolean
  isLoading: boolean
}
export interface IQuestion {
  answerType: string
  id: string
  required: boolean
  score: number
  title: string
  userEarnedScore: number
  assessedScore: number
  answers: IAnswer[] | []
}

export interface IAnswersProps {
  question: IQuestion
  i: number
}
export interface IAssessmentFormAssess {
  id: string
  score: number
}
export interface IAssessmentFormSumTotalScore {
  email: string
  assess: IAssessmentFormAssess[]
}

export interface IGradingAssessmentForm {
  grading: boolean
  earnedScore: number
  score: number
  setEarnedScore: React.Dispatch<React.SetStateAction<number>>
  i: number
  setGrading: React.Dispatch<React.SetStateAction<boolean>>
  userEarnedScore: number
}

export interface IAssessAnswer {
  questionId: string
  score: number
}
export interface IAssessForm {
  formId: string
  requestBody: {
    type: string
    assess: IAssessAnswer[]
  }
}

export interface IFillAnswer {
  id?: string
  text?: string
}
export interface IApplyForm {
  questionId: string
  answers: IFillAnswer[]
}
export interface IApplyAssessMentForm {
  id: string
  requestBody: {
    email: string
    apply: IApplyForm[]
  }
}

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
export type TUseAssessForm = UseMutation<Void, any, ResponseErrorParam, IAssessForm>;
export type TUseApplyAssessMentForm = UseMutation<Void, any, ResponseErrorParam, IApplyAssessMentForm>;

export type useGetAssessmentFormById = (id: string, options: AssessmentFormOptions) => IGetAssessmentForm
