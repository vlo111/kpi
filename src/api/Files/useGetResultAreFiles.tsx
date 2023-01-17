import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/result-area/5879e581-78d9-4f98-8083-8cc70b84763a';

const useGetResultAreaFile: any = (id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
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

export default useGetResultAreaFile;
