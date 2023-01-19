import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-form';

const getApplicationCourse: any = (courseId: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, courseId],
    async () => await client.get(`${url}/course/${courseId}`),
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

export default getApplicationCourse;
