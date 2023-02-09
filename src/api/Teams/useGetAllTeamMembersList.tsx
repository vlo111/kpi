import { useQuery } from '@tanstack/react-query';
import { GetAllTeamsListOptions, GetAllTeamsListParams, UseGetAllTeamsListResult } from '../../types/teams';

import client from '../client';

const url = '/api/users/';

const useGetAllTeamsList: (
  params?: GetAllTeamsListParams,
  options?: GetAllTeamsListOptions
) => UseGetAllTeamsListResult = (params = { limit: 11, offset: 10 }, options = { enabled: true }) => {
  const result = useQuery(
    [url, params],
    async () => await client.get(url, { params }),
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
