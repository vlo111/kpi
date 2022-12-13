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

export type CreateActivityTemplate = UseMutation<Void, any, ResponseErrorParam, ICreateTemplateData>;
