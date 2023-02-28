import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../../../types/api/activity/template';

import client from '../../../client';
const url = 'api/sub-activity/course';
const useAttacheFilesSubActivitySection: any = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/attach/file`, params.data);
      }
    },
    options
  );
export default useAttacheFilesSubActivitySection;
