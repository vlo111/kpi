import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { message } from 'antd';
import { UseFinishApplicant } from '../../types/api/applicant';

export const url = '/api/sub-activity/course/:id/finish';

const useFinishApplicant: UseFinishApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params) => {
      await client.patch(url.replace(':id', params.id));
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(['api/applicant/:id/course/:sectionDataId/history']);
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('successfully finished', 2);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useFinishApplicant;
