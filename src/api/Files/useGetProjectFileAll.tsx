import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/:id/all';

const useGetAllFile: any = (id: string, offset: number, limit: number, search?: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, search, offset],
    async () => await client.post(url.replace(':id', id), { offset, limit, search }),
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
