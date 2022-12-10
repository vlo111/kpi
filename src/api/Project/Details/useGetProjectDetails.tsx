import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  IResultArea,
  QueryGetResultArea
} from '../../../types/api/project/get-project';

import client from '../../client';

const URL_GET_PROJECTS = 'api/project';

export const useGetProjectDetails: (id: string | undefined) => [] | undefined = (id: string | undefined) => {
  try {
    if (id !== undefined) {
      const { data }: QueryGetResultArea =
        useQuery<AxiosResponse<IResultArea>, Error>(
          ['project', id],
          async () => await client.get(`${URL_GET_PROJECTS}/${id}/project-details`)
        );

      return data?.data?.result;
    }
  } catch (e) {
    console.log(e);
  }
};
