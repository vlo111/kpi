import { useQuery } from '@tanstack/react-query';
import { useGetAssessmentFormById } from '../../types/api/assessment';
import client from '../client';

const url = '/api/assessment-form/:id/apply';

const useGetAssessmentForm: useGetAssessmentFormById = (id, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id)),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    data: isSuccess ? data : {},
    isLoading
  };
};

export default useGetAssessmentForm;
