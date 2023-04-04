import { useQuery } from '@tanstack/react-query';
import client from '../client';

const url = 'api/sub-activity/project';

const useGetProjectAllSubActivitiesList: any = (id: string, params: object = {}, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.post(`${url}/${id}`, params),
    {
      ...options,
      retry: false,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, isLoading, error, isFetching, refetch } = result;
  return {
    ...result,
    error,
    data: isSuccess ? data?.result : [],
    isFetching,
    isLoading,
    refetch
  };
};

export default useGetProjectAllSubActivitiesList;
