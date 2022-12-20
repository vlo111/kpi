import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { UseGetProjectDetails } from '../../types/api/project/get-project';

const URL_GET_PROJECTS = 'api/project/:id/project-details';

const useGetProjectDetails: UseGetProjectDetails = (id: string | undefined) => {
  try {
    if (id !== undefined) {
      const { data, isLoading } =
        useQuery(
          [URL_GET_PROJECTS, id],
          async () => await client.get(URL_GET_PROJECTS.replace(':id', id))
        );
      return { projectDetails: data?.data?.result, isLoading };
    }
  } catch (e) {
    console.log(e);
  }
};

export default useGetProjectDetails;
