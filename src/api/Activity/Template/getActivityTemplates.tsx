import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const GetTemplates: any = (params = {}, options = { enabled: false }) => {
  const result = useQuery(
    [url, params],
    async () => await client.get(`${url}/${params.id}/templates`),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : []
  };
};

export default GetTemplates;
