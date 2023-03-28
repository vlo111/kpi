import { useQuery } from '@tanstack/react-query';
import client from '../../client';

const url = '/api/sub-activity';

const GetSingleSubActivity: any = (id: string, params: object = {}, options = { enabled: false }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(`${url}/${id}`, params),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, refetch, isLoading } = result;
  return {
    data,
    isSuccess,
    refetch,
    isLoading
  };
};

export default GetSingleSubActivity;
