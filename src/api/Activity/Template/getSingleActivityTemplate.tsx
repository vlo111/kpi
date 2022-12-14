import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const GetSingleTemplate: any = (params = {}, options = { enabled: true }) => {
  const result = useQuery(
    [url, params],
    async () => await client.get(`${url}/template/${params.id}`),
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

export default GetSingleTemplate;
