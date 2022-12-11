import { useQuery } from '@tanstack/react-query';
import client from '../../client';
import { UseGetProjectDetails } from '../../../types/api/project/get-project';

const URL_GET_PROJECTS = 'api/project';

export const useGetProjectDetails: UseGetProjectDetails = (id: string | undefined) => {
  try {
    if (id !== undefined) {
      const { data } =
        useQuery(
          ['project', id],
          async () => await client.get(`${URL_GET_PROJECTS}/${id}/project-details`)
        );

      return data?.data?.result;
    }
  } catch (e) {
    console.log(e);
  }
};
