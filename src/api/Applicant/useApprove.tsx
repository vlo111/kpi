import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { UseApproveApplicant } from '../../types/api/applicant';
import { message } from 'antd';

const useApproveApplicant: UseApproveApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      if (params.sectionId !== undefined) {
        return await client.post(
          `api/applicant/course/${params.sectionId}/status/approve`,
          {
            applicantIds: params.applicantIds,
            note: params.note
          }
        );
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([
          'api/applicant/:id/course/:sectionDataId/history'
        ]);

        void queryClient.invalidateQueries([
          '/api/sub-activity'
        ]);

        void message.success('successfully approved', 2);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};

export default useApproveApplicant;
