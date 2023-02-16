import { useQuery } from '@tanstack/react-query';
import { GetEligibleUsersListBySubActivityId } from '../../../types/api/activity/subActivity';
import client from '../../client';

export const url = '/api/sub-activity';

const useGetEligibleUsersListBySubActivityId: GetEligibleUsersListBySubActivityId = (subActivityId, options = { enabled: false }) => {
  const result = useQuery(
    [url, subActivityId],
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    async () => await client.get(`${url}/${subActivityId}/eligible/users`),
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
