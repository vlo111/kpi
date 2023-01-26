import { useQuery } from '@tanstack/react-query';
import client from '../client';

const url = '/api/applicant';

const useGetApplicantsFilter: any = (id: string, params: object = {}, options = { enabled: false }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.post(`${url}/${id}`, params),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    data: isSuccess ? data?.result : [],
    isLoading
    // refetch
  };
};

export default useGetApplicantsFilter;
