import { useQuery } from '@tanstack/react-query';
import { GetSingleAssessmentForm } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form';

const getSingleAssessmentFormById: GetSingleAssessmentForm = (formId, options = { enabled: false }) => {
  const result = useQuery(
    [url, formId],
    async () => await client.get(`${url}/${formId}`),
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

export default getSingleAssessmentFormById;
