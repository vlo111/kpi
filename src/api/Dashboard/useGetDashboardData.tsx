import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/dashboard/project/{projectId}/info';

const useGetDashboardData: any = (
  projectId: string,
  options = { enabled: false }
) => {
  const result = useQuery(
    [url, projectId],
    async () => await client.get(url.replace('{projectId}', projectId)),
    {
      ...options,
      select: (data) => data.data
    }
  );

  const { data, isSuccess, refetch, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : {},
    isLoading,
    refetch
  };
};

export default useGetDashboardData;
