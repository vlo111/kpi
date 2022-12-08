import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  IProject,
  QueryGetProject,
  UseGetProjectId
} from '../../types/api/project/get-project';

import client from '../client';

export const URL_GET_PROJECTS = 'api/project';

export const useGetProjectById: UseGetProjectId = (id) => {
  try {
    if (id !== undefined) {
      const { data, status, error, isLoading }: QueryGetProject =
        useQuery<AxiosResponse<IProject>, Error>(
          ['project', id],
          async () => await client.get(`${URL_GET_PROJECTS}/${id}`)
        );
      return {
        status,
        error,
        isLoading,
        project: data?.data?.result
      };
    }
  } catch (e) {
    console.log(e);
  }
};
