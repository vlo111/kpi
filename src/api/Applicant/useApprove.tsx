import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';

const useApproveApplicant: any = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: {
      sectionId: string
      applicantId: string
      note: string
    }) => {
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
        void queryClient.invalidateQueries(['api/applicant/:id']);
      },
      onError: (err) => {
        console.log(err);
      }
    }
  );
};
export default useApproveApplicant;
