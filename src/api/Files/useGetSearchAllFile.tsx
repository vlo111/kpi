import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/:id/all';

const useGetAllSearchFile: any = (id: string, search: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, search],
    async () => await client.get(url.replace(':id', id), { params: { offset: 0, limit: 50, search } }),
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

export default useGetAllSearchFile;
