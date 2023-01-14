import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/result-area/1798e2fd-9f7a-41e5-8774-da93f30ba6ea';

const useGetResultAreaFile: any = (id: string, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
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

export default useGetResultAreaFile;
