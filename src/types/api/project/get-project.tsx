import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  ICreateProject,
  IProjectDetails,
  IResultAreaData, ProjectDetails,
  ProjectErrorResponse
} from '../../project';
import { IQueryData, Mutate, UseMutation, Void } from '../../global';
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
  result: { resultAreas: IResultAreaData[] }
}

export interface ICreateResultAreaData {
  id: string
  data: IResultAreaData[]
}

export interface IUseGetResultArea { isLoading: boolean, resultAreas: IResultAreaData[] }

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
) => { resultAreas: IResultAreaData[] | undefined, isLoading: boolean } | undefined;

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

export interface IUseCreateProject { mutate: Mutate<ICreateProjectData, ResponseErrorParam>, isLoading: boolean }

export interface IsLoading { isLoading: boolean }

interface ProjectDetailsData {
  projectDetails: ProjectDetails
  isLoading: boolean
}

export type UseGetProjectDetails = (id: any, options?: { enabled: boolean }) => ProjectDetailsData
