import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-form';

const getApplicationFormDefault: any = (applicationId: string, options = { enabled: true }) => {
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
    data: isSuccess ? data?.result : {},
    isLoading,
    refetch
  };
};

export default getApplicationFormDefault;
