import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';

export interface IApplicationFormSections {
  title: string
  description: string
  order: number
  keyName: string
  allowedEmpty: boolean
  editable: boolean
  questions: [
    {
      title: string
      description: string
      helpText: string
      editable: boolean
      required: boolean
      otherOption: boolean
      keyName: string
      active: boolean
      answerType: string
      answers: [
        {
          title: string
          type: string
        }
      ]
      relatedQuestions: [
        {
          title: string
          description: string
          helpText: string
          editable: boolean
          keyName: string
          required: boolean
          otherOption: boolean
          active: boolean
          answerType: string
          answers: [
            {
              title: string
              type: string
            }
          ]
        }
      ]
    }
  ]
}

export interface ICreateApplicationForm {
  id: string | undefined
  data: {
    result?: string
    title: string
    description: string
    successMessage: string
    termsAndConditions: string
    onlineSignature: boolean
    deadline: string
    applicationFormSections: IApplicationFormSections[]
  }
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
