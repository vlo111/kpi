import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  ICreateResultArea,
  QueryGetResultArea, UseGetProjectResultArea
} from '../../types/api/project/get-project';

import client from '../client';

const URL_GET_PROJECTS = 'api/project/:id/result-areas';

const useGetResultArea: UseGetProjectResultArea = (id) => {
  try {
    if (id !== undefined) {
      const { data, isLoading }: QueryGetResultArea =
        useQuery<AxiosResponse<ICreateResultArea>, Error>(
          [URL_GET_PROJECTS, id],
          async () => await client.get(URL_GET_PROJECTS.replace(':id', id))
        );
      console.log(data, 'id !== undefined', id);

      return { resultAreas: data?.data?.result.resultAreas, isLoading };
    }
  } catch (e) {
    console.log(e);
  }
};

export default useGetResultArea;
