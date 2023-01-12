import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/4a77b8b4-3ef9-4de2-8dc5-22e1bc006714/files';

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
