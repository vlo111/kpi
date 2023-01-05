import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-for';

const getApplicationForm: any = (applicationId: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, applicationId],
    async () => await client.get(`${url}/course/${applicationId}/default`),
    {
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

export default getApplicationForm;
