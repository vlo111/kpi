import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/:id/files';

const useGetCoursSectionFile: any = (id: string, options = { enabled: true }) => {
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
    data: isSuccess ? data : {}
  };
};

export default useGetCoursSectionFile;
