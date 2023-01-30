/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMutation } from '@tanstack/react-query';

import client from '../../../client';
const url = 'api/sub-activity/course';
const useAttacheFilesSubActivitySection: any = (options = {}) =>
  useMutation(
    async (params: any) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/attach/file`, params.data);
      }
    },
    options
  );
export default useAttacheFilesSubActivitySection;
