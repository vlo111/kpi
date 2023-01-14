import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/course/9d287886-177b-486d-b61c-2482d5373cca/files';

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
