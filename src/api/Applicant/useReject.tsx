import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { UseRejectApplicant } from '../../types/api/applicant';
import { message } from 'antd';

const useRejectApplicant: UseRejectApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      if (params.sectionId !== undefined) {
        const payload = {
          applicantIds: params.applicantIds,
          note: params.note,
          reasonsForRejection: params.reasonsForRejection
        };

        return await client.post(
          `api/applicant/course/${params.sectionId}/status/reject`,
          payload
        );
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'api/applicant/:id/project/:projectId'
        ]);

        void message.success('successfully rejected', 2);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};

export default useRejectApplicant;
