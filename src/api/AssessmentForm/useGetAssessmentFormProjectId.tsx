import { useQuery } from '@tanstack/react-query';
import { GetAssessmentFormByProjectId } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form/project';

const getAssessmentFormByProjectId: GetAssessmentFormByProjectId = (projectId, params, options = { enabled: false }) => {
  const result = useQuery(
    [url, projectId, params],
    async () => await client.get(`${url}/${projectId}`, { params }),
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

export default getAssessmentFormByProjectId;
