import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-form/:id';

const useSingleApplicationForm: any = (id: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
    {
      select: (data) => data?.data,
      retry: false,
      ...options
    }
  );
  const { data, isSuccess, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data : {},
    isLoading
  };
};

export default useSingleApplicationForm;
