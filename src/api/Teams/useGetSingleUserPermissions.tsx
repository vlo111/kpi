import { useQuery } from '@tanstack/react-query';
import { GetSingleUserPermissions } from '../../types/teams';
import client from '../client';

export const url = '/api/users';

const useGetSingleUserPermissions: GetSingleUserPermissions = (userId, projectId, options = { enabled: false }) => {
  const result = useQuery(
    [url, projectId, userId],
    async () => await client.get(`${url}/${userId}/permissions/${projectId}`),
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

export default useGetSingleUserPermissions;
