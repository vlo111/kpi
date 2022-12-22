import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = 'api/project/:id';

const useGetProjectById: any = (id: string, options = { enabled: true }) => {
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
    data: isSuccess ? data : [],
    inputActivityId: isSuccess ? data?.result?.resultAreas[0]?.inputActivities[0]?.id : []
  };
};

export default useGetProjectById;
