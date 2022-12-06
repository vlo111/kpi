import { useQuery } from '@tanstack/react-query';

import client from '../client';

export const URL_GET_PROJECTS = 'api/project';

export const useGetProject = (params = {}, options = { enabled: true }): any => {
  const result = useQuery([URL_GET_PROJECTS, params], (): any => client.get(URL_GET_PROJECTS));
  return {
    ...result
  };
};
