import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const GetSingleTemplate: any = (id: string, options = { enabled: false }) => {
  console.log(id);
  const result = useQuery(
    [url, id],
    async () => await client.get(`${url}/template/${id}`),
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
