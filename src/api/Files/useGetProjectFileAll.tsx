import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/project/e741d8ab-5161-4097-852c-35a934fe2f45/all';

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
