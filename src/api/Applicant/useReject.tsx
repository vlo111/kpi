import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { UseRejectApplicant } from '../../types/api/applicant';

const useRejectApplicant: UseRejectApplicant = () => {
  const queryClient = useQueryClient();

  const options = {
    onSuccess: () => {
      void queryClient.invalidateQueries([
        'api/applicant/:id/project/:projectId'
      ]);
    }
  };

  return useMutation(async (params) => {
    if (params.sectionId !== undefined) {
      const payload = {
        applicantIds: [params.applicantIds],
        note: params.note,
        reasonsForRejection: params.reasonsForRejection
      };

      return await client.post(
        `api/applicant/course/${params.sectionId}/status/reject`,
        payload
      );
    }
  }, options);
};
export default useRejectApplicant;
