import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/:id/all';

const useGetAllFile: any = (id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
    isLoading
  };
};

export default useGetAllFile;
