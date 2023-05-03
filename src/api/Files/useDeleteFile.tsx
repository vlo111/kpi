import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/file';

const useDeleteFile: any = (options = {}) => {
  return useMutation(
    async (name: string) => {
      await client.delete(`${url}/${name}`);
    },
    {
      ...options
    }
  );
};
export default useDeleteFile;
