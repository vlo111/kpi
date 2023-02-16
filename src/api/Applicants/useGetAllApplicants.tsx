import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = 'api/applicant/project/:id';

const useAllAplicants: any = (params: any, id: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.post(url.replace(':id', id), params),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, refetch } = result;
  return {
    ...result,
    refetch,
    data: isSuccess ? data : []
  };
};

export default useAllAplicants;
