import { useQuery } from '@tanstack/react-query';
import { GetAssessmentFormByCourseId } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form/course/:id';

const useGetAssessmentFormByCourseId: GetAssessmentFormByCourseId = (id, params, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, params],
    async () => await client.get(url.replace(':id', id), { params }),
    {
      ...options,
      select: (data) => data.data
    }
  );

  const { data, isSuccess, refetch, isLoading } = result;

  return {
    ...result,
    data: isSuccess ? data?.result : [],
    isLoading,
    refetch
  };
};

export default useGetAssessmentFormByCourseId;
