import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { UseGetProjectDetails } from '../../types/api/project/get-project';

const url = 'api/project/:id/project-details';

const useGetProjectDetails: UseGetProjectDetails = (id, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async (values) => await client.get(url.replace(':id', id), values),
    {
      ...options,
      select: (data) => data?.data
    }
  );
  const { data, isSuccess, isLoading, isFetching } = result;
  return {
    ...result,
    projectDetails: isSuccess ? data?.result : [],
    isLoading,
    isFetching
  };
};

export default useGetProjectDetails;
