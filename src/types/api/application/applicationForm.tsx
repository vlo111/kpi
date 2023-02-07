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
  deadline: string
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
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
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
  setIsQuestionCardVisible: React.Dispatch<React.SetStateAction<string[]>>
  cardId: string
  description: string | undefined
  applicationData: IApplicant
  setApplicationData: React.Dispatch<
  React.SetStateAction<IApplicant | undefined>
  >
}

export interface IQuestionRowContainer {
  question: IRelatedQuestion
  index: number
  content: IQuestion[]
  applicationData: IApplicant
  setApplicationData: React.Dispatch<
  React.SetStateAction<IApplicant | undefined>
  >
  setIsQuestionCardVisible: React.Dispatch<React.SetStateAction<string[]>>
  isQuestionCardVisible: string[]
  cardId: string
  setAnswerTypeValue: React.Dispatch<React.SetStateAction<string>>
  setSingleQuestionData: React.Dispatch<React.SetStateAction<IQuestion | undefined>>
  setAddOrUpdateQuestion: React.Dispatch<React.SetStateAction<string>>
  setQuestionRowIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface IAddQuestionCard {
  setIsQuestionCardVisible: React.Dispatch<React.SetStateAction<string[]>>
  isQuestionCardVisible: string[]
  cardId: string
  applicationData: IApplicant
  answerTypeValue: string
  setAnswerTypeValue: React.Dispatch<React.SetStateAction<string>>
  singleQuestionData: IQuestion | undefined
  setSingleQuestionData: React.Dispatch<React.SetStateAction<IQuestion | undefined>>
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
  setFormUrlModal: React.Dispatch<React.SetStateAction<boolean>>
  responseIds: IResult | undefined
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
