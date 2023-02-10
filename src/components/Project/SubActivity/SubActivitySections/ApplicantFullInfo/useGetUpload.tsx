import { useMutation } from '@tanstack/react-query';

import client from  '../../../../../api/client';

const url = 'api/sub-activity/course/:id/download/applicants';
const useAttacheFiles: any = (options = {}) =>
  useMutation(
    async (id: any) => {
      if (id !== undefined) {
        const data = await client.post(url.replace(':id', id));
      }
    },
    options
  );
export default useAttacheFiles;
