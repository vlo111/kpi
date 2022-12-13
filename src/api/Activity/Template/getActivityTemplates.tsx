import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/activity';

const useGroups: any = (id: any) => {
//   return useQuery < { TQueryFnData: unknown, TError: unknown } >({
//     enabled: true
//   });
  const { data, isLoading } = useQuery(
    ['templates', id],
    async () => await client.get(`${url}/`)
  );

  return { templates: data?.data?.result, isLoading };
};

export default useGroups;
