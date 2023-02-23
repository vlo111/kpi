import { useQuery } from '@tanstack/react-query';
import { GetEligibleUsersListBySubActivityId } from '../../../types/api/activity/subActivity';
import client from '../../client';

const url = '/api/sub-activity/:id/eligible/users';

const useGetEligibleUsersListBySubActivityId: GetEligibleUsersListBySubActivityId = (subActivityId, options = { enabled: true }) => {
  const result = useQuery(
    [url, subActivityId],
    async () => await client.get(url.replace(':id', subActivityId as string)),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, isLoading, refetch } = result;
  return {
    data: isSuccess ? data?.result : [],
    isSuccess,
    isLoading,
    refetch
  };
};

export default useGetEligibleUsersListBySubActivityId;
