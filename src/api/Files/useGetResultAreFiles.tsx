import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/result-area/:id';

const useGetResultAreaFile: any = (id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isFetching } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
    isFetching
  };
};

export default useGetResultAreaFile;
