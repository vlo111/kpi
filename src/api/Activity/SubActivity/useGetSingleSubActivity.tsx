import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = '/api/sub-activity';

const GetSingleSubActivity: any = (id: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(`${url}/${id}`),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, refetch } = result;
  return {
    data,
    isSuccess,
    refetch
  };
};

export default GetSingleSubActivity;
