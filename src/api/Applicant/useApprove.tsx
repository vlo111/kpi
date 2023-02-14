import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { UseApproveApplicant } from '../../types/api/applicant';

const useApproveApplicant: UseApproveApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      if (params.sectionId !== undefined) {
        return await client.post(
          `api/applicant/course/${params.sectionId}/status/approve`,
          {
            applicantIds: [params.applicantId],
            note: params.note
          }
        );
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'api/applicant/:id/project/:projectId'
        ]);
      }
    }
  );
};

export default useApproveApplicant;
