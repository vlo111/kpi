import { useMutation } from '@tanstack/react-query';
import { AttachFileSubActivity, IAttachFileSubActivity } from '../../../types/api/activity/subActivity';

import client from '../../client';

const url = 'api/sub-activity/course';

const useAttacheFilesSubActivitySection: AttachFileSubActivity = (options = {}) =>
  useMutation(
    async (params: IAttachFileSubActivity) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/attach/file`, params.data);
      }
    },
    options
  );
export default useAttacheFilesSubActivitySection;
