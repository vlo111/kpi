import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';

const useRejectApplicant: any = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: {
      sectionId: string
      applicantIds: string
      note: string
      reasonsForRejection: string
    }) => {
      if (params.sectionId !== undefined) {
        const payload = {
          applicantIds: [params.applicantIds],
          note: params.note,
          reasonsForRejection: params.reasonsForRejection
        };

        return await client.post(`api/applicant/course/${params.sectionId}/status/reject`, payload);
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
export default useRejectApplicant;
