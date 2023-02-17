import { useQuery } from '@tanstack/react-query';
import { GetAssessmentFormByCourseId } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form/course';

const getAssessmentFormByCourseId: GetAssessmentFormByCourseId = (courseId, params, options = { enabled: false }) => {
  const result = useQuery(
    [url, courseId, params],
    async () => await client.get(`${url}/${courseId}`, { params }),
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

export default getAssessmentFormByCourseId;
