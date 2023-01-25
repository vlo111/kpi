import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/applicant';

const useAllAplicantsSearch: any = (search: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, search],
    async () => await client.post(url, { limit: 50, offset: 0, search }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : []
  };
};

export default useAllAplicantsSearch;
