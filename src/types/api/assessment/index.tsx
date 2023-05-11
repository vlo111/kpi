import React, { Dispatch, SetStateAction } from 'react';
import { UseMutation, Void } from '../../global';
import { IOnlyId } from '../activity/template';
import { ResponseErrorParam } from '../project/get-project';
import type { StoreValue } from 'rc-field-form/lib/interface';
import { FormListFieldData } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

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
  APPLICATION,
}

export type EnumAssessmentFormTypes = keyof typeof AssessmentFormType;

enum AssessmentFormAnswers {
  OPTION,
  SHORT_TEXT,
  CHECKBOX,
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
  answers: IAnswerCreate[]
}

export interface IAnswerCreate {
  id?: string
  title: string
  score: number
  type: enumAssessmentFormAnswers
}

export interface IAnswer {
  id?: string
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
  data: IAssessments[]
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

export type UpdateNames = (items: (IAssessmentCheckbox[] | undefined) | (IAssessmentRadio[] | undefined)) => void
export type AddQuestionChecks = (type: string, itemName: number, value: any) => void

export interface IAssessmentFormItems {
  questionsLists: FormListFieldData[]
  remove: RemoveType
  name: Array<string | number>
  add: AddType
  answerType: string
  setAnswerType: Dispatch<SetStateAction<string>>
  setAllScore: Dispatch<SetStateAction<number>>
  preview?: boolean
  assessmentData: IResult
  checkbox: IAssessmentCheckbox[] | undefined
  setCheckbox: Dispatch<SetStateAction<IAssessmentCheckbox[] | undefined>>
  radio: IAssessmentRadio[] | undefined
  setRadio: Dispatch<SetStateAction<IAssessmentRadio[] | undefined>>
}

export type RemoveQuestion = (n: number, updateName: boolean) => void

export interface IQuestionHeader {
  remove: RemoveType
  removeQuestion: RemoveQuestion
  name: any
  add: AddType
  setAnswerType: Dispatch<SetStateAction<string>>
  answerType: string
  questionsLists: FormListFieldData[]
  preview?: boolean
  calcScores: Void
  addQuestionChecks: (type: string, itemName: number, value: any) => void
}

export interface IAssessmentCheckbox {
  name: number
  value: number[]
}

export interface IAssessmentRadio {
  name: number
  value: number | undefined
}

export interface IQuestionContent {
  name: Array<string | number>
  answerType: string
  setAllScore: Dispatch<SetStateAction<number>>
  preview?: boolean
  calcScores: Void
  checkboxScoreCount: number
  checkboxScoreCalc: Void
  assessmentData: IResult
  checkbox: IAssessmentCheckbox[] | undefined
  setCheckbox: Dispatch<SetStateAction<IAssessmentCheckbox[] | undefined>>
  radio: IAssessmentRadio[] | undefined
  setRadio: Dispatch<SetStateAction<IAssessmentRadio[] | undefined>>
}

export interface IDynamicQuestionForm {
  contentName: Array<string | number>
  answerType: string
  calcScores: Void
  preview?: boolean
  radio: IAssessmentRadio[] | undefined
  setRadio: Dispatch<SetStateAction<IAssessmentRadio[] | undefined>>
  checkbox: IAssessmentCheckbox[] | undefined
  setCheckbox: Dispatch<SetStateAction<IAssessmentCheckbox[] | undefined>>
  checkboxScoreCount: number
  checkboxScoreCalc: Void
  assessmentData: IResult
}

export interface IPreviewAssessmentModal {
  openPreviewAssessmentModal: boolean
  setOpenPreviewAssessmentModal: Dispatch<SetStateAction<boolean>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
  footerButtons: IAssessments | undefined
  courseId: string
  navigateRouteInfo: INavigateRoteInfoTypes
  type: string
  projectId: string
}
export interface ICheckboxGroup {
  setCheckbox: Dispatch<SetStateAction<IAssessmentCheckbox[] | undefined>>
  checkbox: IAssessmentCheckbox[] | undefined
  checkboxScoreCalc: Void
  calcScores: Void
  answerList: FormListFieldData[]
  contentName: Array<string | number>
  remove: RemoveType
  preview?: boolean
}

export interface IRadioGroup {
  answerList: FormListFieldData[]
  contentName: Array<string | number>
  remove: RemoveType
  preview?: boolean
  calcScores: Void
  setAddOder: Dispatch<SetStateAction<boolean>>
  radio: IAssessmentRadio[] | undefined
  setRadio: Dispatch<SetStateAction<IAssessmentRadio[] | undefined>>
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
    type: string
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
  isFetching: boolean
}
export interface IQuestion {
  answerType: string
  id?: string
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
  setAllScore?: React.Dispatch<React.SetStateAction<number | undefined>>
  allScore?: number | undefined
  activateSave: boolean
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
  setAllScore?: React.Dispatch<React.SetStateAction<number | undefined>>
  allScore?: number | undefined
  activateSave: boolean
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

export interface IFooterButtons {
  id: string
  title: string
  type: string
  active: boolean
}
export interface IPreviewAssessmentForm {
  data?: IResult
  isPreviewForm?: boolean
  setIsPreviewForm?: React.Dispatch<React.SetStateAction<boolean>> | any
  setOpenPreviewAssessmentForm?: React.Dispatch<React.SetStateAction<boolean>> | any
  openPreviewAssessmentForm?: boolean
  formId?: string | undefined | any
  applicantPreview?: boolean
}

export interface IAssessmentForms {
  preview?: boolean
  footerButtons?: IFooterButtons
}

export type CreateAssessmentFormByCourseId = UseMutation<
Void,
any,
ResponseErrorParam,
CreateAssessmentFormData
>;
export type UpdateAssessmentFormByFormId = UseMutation<
Void,
any,
ResponseErrorParam,
UpdateAssessmentFormData
>;
export type DeleteAssessmentFormByFormId = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;
export type DuplicateAssessmentFormByFormId = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;
export type ChangeStatusAssessmentFormByFormId = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;

export interface IAssessmentSelectItem {
  name: string
  value: string
}

export interface IButtonContainer {
  marginTop?: string
}
export type TUseAssessForm = UseMutation<Void, any, ResponseErrorParam, IAssessForm>;
export type TUseApplyAssessMentForm = UseMutation<
Void,
any,
ResponseErrorParam,
IApplyAssessMentForm
>;

export type useGetAssessmentFormById = (
  id: string,
  options: AssessmentFormOptions
) => IGetAssessmentForm;
export type AddType = (defaultValue?: StoreValue, insertIndex?: number) => void;
export type RemoveType = (index: number | number[]) => void;
export type OnDeleteAnswerType = (remove: RemoveType, name: number) => void;
export type RadioGroupChangeType = (val: RadioChangeEvent) => void;
export type OnDeleteCheckboxGroupItemType = (
  remove: RemoveType,
  name: number
) => void;
export type OnAddQuestionType = (add: AddType, name?: number) => void;
