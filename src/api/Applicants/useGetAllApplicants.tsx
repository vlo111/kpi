import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/applicant';

const useAllAplicants: any = (options = { enabled: true }) => {
  const result = useQuery(
    [url],
    async () => await client.post(url, { limit: 50, offset: 0 }),
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
