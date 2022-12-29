import { useMutation } from '@tanstack/react-query';
import { IOnlyId, UpdateSingleStatus } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template/section/setting';

const useUpdateSectionStatus: UpdateSingleStatus = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.patch(`${url}/${params.id}`);
    },
    options
  );
export default useUpdateSectionStatus;
