import { Dispatch, SetStateAction } from 'react';
import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';

export interface IApplicationFormSections {
  title: string
  description: string
  order: number
  keyName: string
  allowedEmpty: boolean
  editable: boolean
  questions: IQuestion[]
}

export interface IAnswer {
  id?: string
  title: string
  type: string
}

export interface IRelatedQuestion {
  title: string
  description: string
  helpText: string
  editable: boolean
  keyName: string
  required: boolean
  otherOption: boolean
  active: boolean
  answerType: string
  answers: IAnswer[]
}

export interface IQuestion {
  id?: string
  title: string
  description: string
  helpText: string
  editable: boolean
  required: boolean
  otherOption: boolean
  keyName: string
  active: boolean
  answerType: string
  answers: IAnswer[]
  relatedQuestions: IRelatedQuestion[]
}

export interface IApplicant {
  result?: string
  title: string | undefined
  description: string
  successMessage: string | undefined
  termsAndConditions: string | undefined
  onlineSignature: boolean
  deadline: string | undefined | null
  applicationFormSections: IApplicationFormSections[]
}

export interface ICreateApplicationForm {
  id: string | undefined
  data: IApplicant
}

export interface IApplicationsOption {
  data: {
    result: {
      id: string
      subActivityId: string
    }
  }
}

export interface IOnlyId {
  id: string
}

export type CreateApplicationFormType = UseMutation<
Void,
any,
ResponseErrorParam,
ICreateApplicationForm
>;

export type DuplicateApplicationFormType = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;

export type DeleteApplicationForm = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;

export type UpdateApplicationStatus = UseMutation<
Void,
any,
ResponseErrorParam,
IOnlyId
>;

export interface IPreviewModal {
  questionData: IApplicant | undefined
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: Dispatch<SetStateAction<boolean>>
  onPublishClick: Void
}

export interface IPersonalDetails {
  personalDetailsData: IApplicationFormSections
}

export interface IEducationWork {
  educationWorkData: IApplicationFormSections
}

export interface IOtherInformation {
  otherInformationData: IApplicationFormSections
}

export interface IProfessionalSkills {
  professionalSkills: IApplicationFormSections
}

export interface IRelatedQuestionProps {
  relatedQuestion: IQuestion
}

export interface IApplicationCard {
  title: string
  content: IQuestion[] | []
  isQuestionCardVisible: string[]
  setIsQuestionCardVisible: Dispatch<SetStateAction<string[]>>
  cardId: string
  description: string | undefined
  applicationData: IApplicant
  setApplicationData: Dispatch<
  SetStateAction<IApplicant | undefined>
  >
}

export interface IQuestionRowContainer {
  question: IRelatedQuestion
  index: number
  content: IQuestion[]
  applicationData: IApplicant
  setApplicationData: Dispatch<
  SetStateAction<IApplicant | undefined>
  >
  setIsQuestionCardVisible: Dispatch<SetStateAction<string[]>>
  isQuestionCardVisible: string[]
  cardId: string
  setAnswerTypeValue: Dispatch<SetStateAction<string>>
  setSingleQuestionData: Dispatch<SetStateAction<IQuestion | undefined>>
  setAddOrUpdateQuestion: Dispatch<SetStateAction<string>>
  setQuestionRowIndex: Dispatch<SetStateAction<number>>
}

export interface IAddQuestionCard {
  setIsQuestionCardVisible: Dispatch<SetStateAction<string[]>>
  isQuestionCardVisible: string[]
  cardId: string
  applicationData: IApplicant
  answerTypeValue: string
  setAnswerTypeValue: Dispatch<SetStateAction<string>>
  singleQuestionData: IQuestion | undefined
  setSingleQuestionData: Dispatch<SetStateAction<IQuestion | undefined>>
  addOrUpdateQuestion: string
  questionRowIndex: number
}

export interface IResult {
  result: {
    id: string
    subActivityId: string
  }
}

export interface IFormUrlModal {
  formUrlModal: boolean
  setFormUrlModal: Dispatch<SetStateAction<boolean>>
  responseIds: IResult | undefined
}

export interface IAssessmentFormUrlModal {
  formUrlModal: boolean
  setFormUrlModal: Dispatch<SetStateAction<boolean>>
  subActivityId: string
  assessmentFormId: string
}

export interface ICardContainer {
  borderTop?: string
  marginTop?: string
  marginBottom?: string
}
export interface IFormValue {
  answerTypeName: string
  names?: string[]
  otherOption?: boolean
  question: string
  requiredFiled: boolean
}

export type GetApplicationData = (data: IApplicant) => IApplicant
