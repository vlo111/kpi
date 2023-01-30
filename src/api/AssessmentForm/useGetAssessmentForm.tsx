import { useQuery } from '@tanstack/react-query';

import client from '../client';

const url = '/api/assessment-form/:id';

const useGetAssessmentForm: any = (id: string, options = { enabled: true }) => {
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
