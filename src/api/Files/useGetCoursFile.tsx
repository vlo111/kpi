import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/1f26eb84-bc0b-4ca9-a0c1-f6a5cad2f1fb';

const useGetCoursFile: any = (id: string, options = { enabled: true }) => {
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

export default useGetCoursFile;
