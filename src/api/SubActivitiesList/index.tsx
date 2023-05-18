import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { useGetProjectAllSubActivitiesListTypes } from '../../types/api/subActivityTable';

const url = 'api/sub-activity/project';

const useGetProjectAllSubActivitiesList: useGetProjectAllSubActivitiesListTypes =
  (id, params, options = { enabled: true }) => {
    const result = useQuery(
      [url, id, params],
      async () => await client.post(`${url}/${id ?? ''}`, params),
      {
        ...options,
        retry: false,
        select: (data) => data.data
      }
    );
    const { data, isSuccess, isLoading, refetch } = result;
    return {
      ...result,
      data: isSuccess ? data : [],
      isLoading,
      refetch
    };
  };

export default useGetProjectAllSubActivitiesList;
