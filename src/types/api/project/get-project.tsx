import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  ICreateProject,
  IProjectDetails,
  IResultAreaData, ProjectDetails,
  ProjectErrorResponse
} from '../../project';
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

export interface ICreateResultArea {
  result: IResultAreaData
}

export interface ICreateResultAreaData {
  id: string
  data: IResultAreaData
}

export interface ICreateProjectDetails {
  id: string
  data: IProjectDetails
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

export type QueryGetResultArea = UseQueryResult<
AxiosResponse<ICreateResultArea>,
Error
>;

export type UseGetProjectId = (
  id: string | undefined
) => IGetProjectById | undefined;

export type UseGetProjectResultArea1 = (
  id: string | undefined
) => IGetResultArea | undefined;

export type UseGetProjectResultArea = (
  id: string | undefined
) => { resultAreas: IResultAreaData | undefined, isLoading: false | true } | undefined;

export interface ResponseErrorParam {
  message: string
}

export type UseEditProject = UseMutation<
Void,
ProjectErrorResponse,
ResponseErrorParam,
IEditProjectData
>;

export type UseCreateProject = UseMutation<
Void,
ProjectErrorResponse,
ResponseErrorParam,
ICreateProjectData
>;

export type UseCreateResultArea = UseMutation<
Void,
ProjectErrorResponse,
ResponseErrorParam,
ICreateResultAreaData
>;

export type UseCreateProjectDetails = UseMutation<
Void,
ProjectErrorResponse,
ResponseErrorParam,
ICreateProjectDetails
>;

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

interface ProjectDetailsData {
  projectDetails: ProjectDetails
  isLoading: boolean
}

export type UseGetProjectDetails = (id: string | undefined) => ProjectDetailsData | undefined
