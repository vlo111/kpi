import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const GetTemplates: any = (activityId: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, activityId],
    async () => await client.get(`${url}/${activityId}/templates`),
    {
      retry: false,
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, refetch, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : [],
    count: data?.count,
    has_more: data?.count,
    isLoading,
    refetch
  };
};

export default GetTemplates;
