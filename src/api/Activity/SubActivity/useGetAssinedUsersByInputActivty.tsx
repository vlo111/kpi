import { useQuery } from '@tanstack/react-query';
import { GetAssignedUsersListByInputActivityId } from '../../../types/api/activity/subActivity';
import client from '../../client';

export const url = '/api/sub-activity/input-activity';

const useGetAssignedUsersListByInputActivityId: GetAssignedUsersListByInputActivityId = (subActivityId, options = { enabled: false }) => {
  const result = useQuery(
    [url, subActivityId],
    async () => await client.get(`${url}/${subActivityId}/course/assignees`),
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

export default useGetAssignedUsersListByInputActivityId;
