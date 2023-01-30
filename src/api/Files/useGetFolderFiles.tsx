import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/:courseId/setting/:id';

const useGetFolderFiles: any = (courseId: string, id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, courseId, id],
    async () => await client.get(url.replace(':courseId', courseId).replace(':id', id)),
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

export default useGetFolderFiles;
