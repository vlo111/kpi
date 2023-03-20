import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';

export interface ICreateTemplateData {
  id: string | undefined
  data: {
    category: string
    title: string
    description: string
  }
}

type SettingsEnmTyp = 'SHORT_TEXT' | 'NUMBER' | 'ATTACHMENT' | 'DROPDOWN' | string
export interface ICreateSettingData {
  id: string
  data: {
    answerType: SettingsEnmTyp
    title: string
    data: string[]
  }
}

export interface IAddSettingHelpText {
  id: string
  data: {
    text: string
  }
}

export interface IUpdateSettingData {
  id: string
  data: {
    answerType: SettingsEnmTyp
    title: string
    data?: string[]
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
  [x: string]: any
  id: string
}
export interface IOnlyIdAttach {
  data: (arg0: string, data: any) => import('axios').AxiosResponse<any, any> | PromiseLike<import('axios').AxiosResponse<any, any> | undefined> | undefined
  id: string | undefined
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
export type CreateSecondStepTemplate = UseMutation<Void, any, ResponseErrorParam, ICreateSecondStepData>
export type CreateRequiredDocs = UseMutation<Void, any, ResponseErrorParam, ICreateRequiredDocsData>
export type CreateSection = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type CreateSetting = UseMutation<Void, any, ResponseErrorParam, ICreateSettingData>;
export type AddSettingHelpText = UseMutation<Void, any, ResponseErrorParam, IAddSettingHelpText>;
export type DuplicateTemplate = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;

export type PublishActivityTemplate = UseMutation<Void, any, ResponseErrorParam, IOnlyId>;

export type DeleteRequiredDoc = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type DeleteSection = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type DeleteTemplate = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
export type DeleteSetting = UseMutation<Void, any, ResponseErrorParam, IOnlyId>

export type UpdateSetting = UseMutation<Void, any, ResponseErrorParam, IUpdateSettingData>
export type UpdateSingleStatus = UseMutation<Void, any, ResponseErrorParam, IOnlyId>
