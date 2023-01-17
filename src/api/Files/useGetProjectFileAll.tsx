import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/b5f7ce3a-5ee0-4818-9d2d-a44b236c181f/all';

const useGetAllFile: any = (id: string, options = { enabled: true }) => {
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

export default useGetAllFile;
