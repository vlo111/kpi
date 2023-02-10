import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { IUploadFileError } from '../../types/files';
import { message } from 'antd';

export const url = '/api/sub-activity/course/:id/finish';

const useFinishApplicant: any = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: any) => {
      await client.patch(url.replace(':id', params.id));
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(['api/applicant/:id/project/:projectId']);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }: IUploadFileError) => message.error(error, 2)
    }
  );
};
export default useFinishApplicant;
