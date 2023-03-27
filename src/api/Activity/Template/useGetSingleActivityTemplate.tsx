import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const getSingleTemplate: any = (id: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(`${url}/template/${id}`),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, refetch, isLoading, isFetching } = result;
  return {
    data: data?.result,
    isSuccess,
    refetch,
    isLoading,
    isFetching
  };
};

export default getSingleTemplate;
