import { useQuery } from '@tanstack/react-query';

import client from '../client';
// import { UseGetProjects } from "../../types/api/project/get-project";

export const URL_GET_PROJECTS = 'api/project';

const useGetProjects: any = (params = {}, options = { enabled: true }) => {
  const result = useQuery(
    [URL_GET_PROJECTS, params],
    async () => await client.get(URL_GET_PROJECTS, { params }),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : []
  };
};

export default useGetProjects;
