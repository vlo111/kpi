import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = '/api/sub-activity';

const GetSingleSubActivity: any = (id: string, params: object = {}, options = { enabled: false }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.get(`${url}/${id}`, params),
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