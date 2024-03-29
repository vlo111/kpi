
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../../client';
import { message } from 'antd';

const url = 'api/media/upload/file';

const useFileUpload: any = (noQuery?: boolean) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: { file: any, type: string }) => {
      const form = new FormData();
      form.append('file', params.file);
      form.append('type', params.type);
      return await client.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    {
      onSuccess: () => {
        if (noQuery === undefined) {
          void queryClient.invalidateQueries(['api/sub-activity/course']);
          void queryClient.invalidateQueries(['/api/sub-activity']);
        }
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useFileUpload;
