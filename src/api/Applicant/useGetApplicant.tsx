import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { UseGetApplicant } from '../../types/applicant';
import { useProject } from '../../hooks/useProject';

const URL_GET_APPLICANT = 'api/applicant/:id/project/:projectId';

// @ts-expect-error
const useGetApplicant: UseGetApplicant = (id: string | undefined) => {
  const { projectId } = useProject();

  try {
    if (id !== undefined) {
      const { data, isLoading } =
        useQuery(
          [URL_GET_APPLICANT, id],
          async () => await client.get(URL_GET_APPLICANT.replace(':id', id).replace(':projectId', projectId))
        );
      return { applicant: data?.data?.result, isLoading };
    }
  } catch (e) {
    console.log(e);
  }
};

export default useGetApplicant;
