import { useMutation } from '@tanstack/react-query';
import { DeleteSetting, IOnlyId } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/file';

const useDeleteSetting: DeleteSetting = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(`${url}/${params.id}`);
    },
    options
  );
export default useDeleteSetting;
