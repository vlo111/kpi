import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { message } from 'antd';
import { IUploadFileError } from '../../types/files';

export const url = '/api/applicant/course/:sectionDataId/move';

const useMoveApplicant: any = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: any) => {
      await client.post(url.replace(':sectionDataId', params.id), {
        applicantIds: [
          params.applicantId
        ]
      });
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(['api/applicant/:id/project/:projectId']);

        void message.success('successfully moved', 2);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }: IUploadFileError) => message.error(error, 2)
    }
  );
};
export default useMoveApplicant;
