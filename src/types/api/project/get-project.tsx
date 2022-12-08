import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ICreateProject, ProjectErrorResponse } from '../../project';
import { IQueryData, UseMutation, Void } from '../../global';
import { Moment } from 'moment';

export interface IProject {
  result: ICreateProject
}

export interface ICreateProjectData {
  startDate: Moment
  endDate: Moment
  title: string
  description: string
}

export interface IEditProjectData {
  id: string
  data: ICreateProjectData
}

export interface IGetProjectById extends IQueryData {
  project: ICreateProject | undefined
}

export type QueryGetProject = UseQueryResult<AxiosResponse<IProject>, Error>;

export type UseGetProjectId = (
  id: string | undefined
) => IGetProjectById | undefined;

export interface ResponseErrorParam { message: string }

export type UseEditProject = UseMutation<Void, ProjectErrorResponse, ResponseErrorParam, IEditProjectData>;

export type UseCreateProject = UseMutation<Void, ProjectErrorResponse, ResponseErrorParam, ICreateProjectData>;

export interface UseGetProjects {
  isLoading: false | true
  data: {
    result: ICreateProject[] | undefined
    has_more: boolean
    count: number
  }
  error: unknown
  status: 'error' | 'success' | 'loading'
}
