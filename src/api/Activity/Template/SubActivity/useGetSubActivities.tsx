import { useQuery } from '@tanstack/react-query';
import client from '../../../client';

const url = 'api/sub-activity/input-activity';

const useGetSubActivities: any = (id: string, params: object = {}, options = { enabled: false }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.post(`${url}/${id}`, params),
    {
      ...options,
      retry: false,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, isLoading, error, isFetching } = result;
  return {
    ...result,
    error,
    data: isSuccess ? data?.result : [],
    isFetching,
    isLoading
    // refetch
  };
};

export default useGetSubActivities;
