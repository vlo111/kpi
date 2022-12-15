import { useMutation } from '@tanstack/react-query';
import { UpdateSetting, IUpdateSettingData } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template/setting';

const useUpdateSingleSetting: UpdateSetting = (options = {}) =>
  useMutation(
    async (params: IUpdateSettingData) =>
      await client.put(`${url}/${params.id}`, params.data),
    options
  );
export default useUpdateSingleSetting;
