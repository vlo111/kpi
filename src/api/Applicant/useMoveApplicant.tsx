import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { message } from 'antd';
import { UseMoveApplicant } from '../../types/api/applicant';

export const url = '/api/applicant/course/:sectionDataId/move';

const useMoveApplicant: UseMoveApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params
    ) => {
      await client.post(url.replace(':sectionDataId', params.id), {
        applicantIds: params.applicantId
      });
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(['api/applicant/:id/course/:sectionDataId/history']);
        void queryClient.invalidateQueries(['/api/sub-activity']);

        void message.success('successfully moved', 2);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useMoveApplicant;
