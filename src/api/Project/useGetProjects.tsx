import { useQuery } from '@tanstack/react-query';

import client from '../client';
import { UseGetProjects } from '../../types/api/project/get-project';

export const URL_GET_PROJECTS = 'api/project';

export const useGetProjects: () => UseGetProjects = () => {
  const { data, status, error, isLoading } = useQuery(
    [URL_GET_PROJECTS],
    async () => await client.get(URL_GET_PROJECTS)
  );

  return { data: data?.data, status, error, isLoading };
};
