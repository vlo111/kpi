import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  ICreateResultArea,
  QueryGetResultArea, UseGetProjectResultArea
} from '../../../types/api/project/get-project';

import client from '../../client';

const URL_GET_PROJECTS = 'api/project';

export const useGetResultArea: UseGetProjectResultArea = (id) => {
  try {
    if (id !== undefined) {
      const { data, isLoading }: QueryGetResultArea =
        useQuery<AxiosResponse<ICreateResultArea>, Error>(
          ['project', id],
          async () => await client.get(`${URL_GET_PROJECTS}/${id}/result-areas`)
        );

      return { resultAreas: data?.data?.result.resultAreas, isLoading };
    }
  } catch (e) {
    console.log(e);
  }
};
