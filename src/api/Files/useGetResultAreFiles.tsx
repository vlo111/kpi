import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/file/result-area/5827581c-ba8a-447a-bdce-3559c386d359';

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
