import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ICreateProject, IResultAreaData, ProjectErrorResponse } from '../../project';
import { IQueryData, UseMutation, Void } from '../../global';
import { Moment } from 'moment';

export interface IProject {
  result: ICreateProject
}

export interface IResultArea {
  result: []
}

export interface ICreateProjectData {
  startDate: Moment
  endDate: Moment
  title: string
  description: string
}

export interface ICreateResultArea {
  result: []
}

export interface ICreateResultAreaData {
  id: string
  data: IResultAreaData
}

export interface IEditProjectData {
  id: string
  data: ICreateProjectData
}

export interface IGetProjectById extends IQueryData {
  project: ICreateProject | undefined
}

export interface IGetResultArea extends IQueryData {
  resultArea: any
}

export type QueryGetProject = UseQueryResult<AxiosResponse<IProject>, Error>;

export type QueryGetResultArea = UseQueryResult<AxiosResponse<IResultArea>, Error>;

export type UseGetProjectId = (
  id: string | undefined
) => IGetProjectById | undefined;

export type UseGetProjectResultArea = (
  id: string | undefined
) => IGetResultArea | undefined;

export interface ResponseErrorParam { message: string }

export type UseEditProject = UseMutation<Void, ProjectErrorResponse, ResponseErrorParam, IEditProjectData>;

export type UseCreateProject = UseMutation<Void, ProjectErrorResponse, ResponseErrorParam, ICreateProjectData>;

export type UseCreateResultArea = UseMutation<Void, ProjectErrorResponse, ResponseErrorParam, ICreateResultAreaData>;

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
