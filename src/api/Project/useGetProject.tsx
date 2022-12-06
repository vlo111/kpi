import { useQuery } from '@tanstack/react-query';

import client from '../client';

export const URL_GET_PROJECTS = 'api/project';

export const useGetProjectById = (
  id = '',
  options = { enabled: true }
): any => {
  const { data: { data: { result = {} } = {} } = {} } = useQuery(
    ['project', id],
    (): any => client.get(`${URL_GET_PROJECTS}/${id}`)
  );
  return result;
};
