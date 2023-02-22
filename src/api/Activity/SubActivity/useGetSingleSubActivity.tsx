import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const USE_GET_SINGLE_SUB_ACTIVITY = '/api/sub-activity';

const GetSingleSubActivity: any = (id: string, params: object = {}, options = { enabled: false }) => {
  const result = useQuery(
    [USE_GET_SINGLE_SUB_ACTIVITY, id],
    async () => await client.get(`${USE_GET_SINGLE_SUB_ACTIVITY}/${id}`, params),
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
