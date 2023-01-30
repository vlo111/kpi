import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/applicant';

const useAllAplicants: any = (params: any, options = { enabled: false }) => {
  const result = useQuery(
    [url],
    async () => await client.post(url, params),
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
