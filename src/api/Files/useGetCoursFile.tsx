import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/:id';

const useGetCoursFile: any = (id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading, isFetched, isRefetching, isInitialLoading } = result;
  console.log(result);
  return {
    ...result,
    data: isSuccess ? data : {},
    isLoading,
    isFetched,
    isRefetching,
    isInitialLoading
  };
};

export default useGetCoursFile;
