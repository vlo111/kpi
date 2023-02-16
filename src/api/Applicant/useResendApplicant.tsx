import { useMutation } from '@tanstack/react-query';
import client from '../client';
import { message } from 'antd';
import { UseResendApplicant } from '../../types/api/applicant';

const useResendApplicant: UseResendApplicant = () => {
  return useMutation(
    async (params
    ) => {
      await client.post(`/api/applicant/${params.id}/course/${params.sectionDataId}/form/send?type=${params.type}`);
    },
    {
      onSuccess: () => {
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
export default useResendApplicant;
