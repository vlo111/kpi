import { useQuery } from '@tanstack/react-query';
import { GetAllTeamsListOptions, GetAllTeamsListParams, UseGetAllTeamsListResult } from '../../types/teams';

import client from '../client';

export const USE_GET_TEAM_LIST = '/api/users/project';

const useGetAllTeamsList: (
  params: GetAllTeamsListParams,
  options?: GetAllTeamsListOptions
) => UseGetAllTeamsListResult = (params, options = { enabled: true }) => {
  const result = useQuery(
    [USE_GET_TEAM_LIST, params],
    async () => await client.post(`${USE_GET_TEAM_LIST}/${params?.projectId}`, { limit: params.limit, offset: params.offset, search: params.search }),
    {
      select: (data) => data?.data,
      retry: false,
      ...options
    }
  );

  const { data, isSuccess, refetch, isLoading, isFetching } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : [],
    count: data?.count,
    has_more: data?.count,
    isLoading,
    refetch,
    isFetching
  };
};

export default useGetAllTeamsList;
