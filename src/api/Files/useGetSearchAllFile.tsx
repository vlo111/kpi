import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/:id/all';

const useGetAllSearchFile: any = (id: string, search: string, offset: number, limit: number, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, search],
    async () => await client.get(url.replace(':id', id), { params: { offset, limit, search } }),
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

export default useGetAllSearchFile;
