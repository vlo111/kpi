import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';

export interface ICreateTemplateData {
  id: string
  data: {
    category: string
    title: string
    description: string
  }
}

type FormEnum = 'APPLICATION' | 'ASSESSMENT'

enum SectionEnum {
  ONE_SECTION,
  MULTI_SECTION
}

type EnumTypes = keyof typeof SectionEnum;
export interface ICreateSecondStepData {
  id: string
  data: {
    applicationForm: FormEnum[]
    courseStructure: EnumTypes
  }
}

export interface IOnlyId {
  id: string
}

export interface ICreateTemplateResponse {
  data: {
    result: {
      id: string
      category: string
      title: string
      description: string
    }
  }
}

export interface ICreateRequiredDocsData {
  id: string
  data: {
    title: string
    count: number
  }
}

export type CreateActivityTemplate = UseMutation<Void, any, ResponseErrorParam, ICreateTemplateData>;
export type PublishActivityTemplate = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;
export type CreateSecondStepTemplate = UseMutation<Void, any, ResponseErrorParam, ICreateSecondStepData>
export type CreateRequiredDocs = UseMutation<Void, any, ResponseErrorParam, ICreateRequiredDocsData>
export type CreateSection = UseMutation<Void, any, ResponseErrorParam, IOnlyId>

export type DeleteRequiredDoc = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type DeleteSection = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
