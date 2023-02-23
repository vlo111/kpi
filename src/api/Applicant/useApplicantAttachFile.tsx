import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { message } from 'antd';
import { UseApplicantAttachFile } from '../../types/api/applicant';

const useApplicantAttachFile: UseApplicantAttachFile = () => {
  const queryClient = useQueryClient();

  return useMutation(async (params) => {
    if (params.id !== undefined) {
      return await client.post(
        `/api/applicant/course/history/${params.id}/attach/file`,
        {
          files: params.files
        }
      );
    }
  }, {
    onSuccess: () => {
      void queryClient.invalidateQueries([
        'api/applicant/:id/project/:projectId'
      ]);
      void message.success('Successfully attached to the status', 2);
    },
    onError: ({
      response: {
        data: { message: error }
      }
    }) => message.error(error, 2)
  });
};

export default useApplicantAttachFile;
