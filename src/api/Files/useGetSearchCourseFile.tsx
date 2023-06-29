import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/:id';

const useGetSearchCourseFile: any = (id: string, search: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, search],
    async () => await client.get(url.replace(':id', id), { params: { search } }),
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

export default useGetSearchCourseFile;
