import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = 'api/project/:id';

const useGetProjectById: any = (id: string, options = { enabled: Boolean(id) }) => {
  const result = useQuery(
    [url, id],
    async (values) => await client.get(url.replace(':id', id), values),
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

export default useGetProjectById;
