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
  id: string
  title: string
  type: string
}

export interface IQuestion extends IRelatedQuestion {
  relatedQuestions: IRelatedQuestion[]
}

export interface IRelatedQuestion {
  id: string
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

export interface IApplicant {
  result?: string
  title: string
  description: string
  successMessage: string
  termsAndConditions: string
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

export type CreateApplicationFormType = UseMutation<Void, any, ResponseErrorParam, ICreateApplicationForm>;
export type DeleteApplicationForm = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type UpdateApplicationStatus = UseMutation<Void, any, ResponseErrorParam, IOnlyId>

export type IUseApplicantForm = (
  id: string,
  options: {
    onSuccess: (data: IApplicant) => void
    onError: (data: IApplicant) => void
  }
) => IApplicant | undefined;
