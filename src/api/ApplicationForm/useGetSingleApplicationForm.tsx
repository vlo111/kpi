import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-form';

const getSingleApplicationForm: any = (formId: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, formId],
    async () => await client.get(`${url}/${formId}`),
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

export default getSingleApplicationForm;
