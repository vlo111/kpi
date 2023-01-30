import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/:id/all';

const useGetAllFile: any = (id: string, offset: number, limit: number, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id), { params: { offset, limit } }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading, isFetching } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
    isLoading,
    isFetching
  };
};

export default useGetAllFile;
