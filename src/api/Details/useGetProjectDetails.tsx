import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { UseGetProjectDetails } from '../../types/api/project/get-project';

const url = 'api/project/:id/project-details';

const useGetProjectDetails: UseGetProjectDetails = (id) => {
  const result = useQuery(
    [url, id],
    async (values) => await client.get(url.replace(':id', id), values),
    {
      select: (data) => data?.data
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    projectDetails: isSuccess ? data?.result : [],
    isLoading
  };
};

export default useGetProjectDetails;
