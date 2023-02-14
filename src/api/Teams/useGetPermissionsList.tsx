import { useQuery } from '@tanstack/react-query';
import { GetPermissionsList } from '../../types/teams';
import client from '../client';

export const url = '/api/users/project';

const usePermissionsListByProjectId: GetPermissionsList = (projectId, options = { enabled: true }) => {
  const result = useQuery(
    [url, projectId],
    async () => await client.get(`${url}/${projectId}/permissions/list`),
    {
      ...options,
      select: (data) => data.data
    }
  );

  const { data, isSuccess, refetch, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : [],
    isLoading,
    refetch
  };
};

export default usePermissionsListByProjectId;
