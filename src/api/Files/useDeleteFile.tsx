import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { message } from 'antd';

const url = 'api/file';

const useDeleteFile: any = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (name: string) => {
      await client.delete(`${url}/${name}`);
    },
    {
      onSuccess: () => {
          void message.success('Deleted file', 2);
          void queryClient.invalidateQueries(['api/sub-activity/course']);
          void queryClient.invalidateQueries(['/api/sub-activity']);
         

      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useDeleteFile;
