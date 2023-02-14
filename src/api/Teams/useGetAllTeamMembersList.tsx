import { useQuery } from '@tanstack/react-query';
import { GetAllTeamsListOptions, GetAllTeamsListParams, UseGetAllTeamsListResult } from '../../types/teams';

import client from '../client';

const url = '/api/users/project';

const useGetAllTeamsList: (
  params: GetAllTeamsListParams,
  options?: GetAllTeamsListOptions
) => UseGetAllTeamsListResult = (params, options = { enabled: true }) => {
  const result = useQuery(
    [url, params],
    async () => await client.get(`${url}/${params?.projectId}`, { params: { limit: params.limit, offset: params.offset, search: params.search } }),
    {
      select: (data) => data?.data,
      ...options
    }
  );

  const { data, isSuccess, refetch, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : [],
    count: data?.count,
    has_more: data?.count,
    isLoading,
    refetch
  };
};

export default useGetAllTeamsList;
