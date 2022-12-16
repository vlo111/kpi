import { useMutation } from '@tanstack/react-query';
import { CreateSetting, ICreateSettingData } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template';

const useCreateNewSetting: CreateSetting = (options = {}) =>
  useMutation(
    async (params: ICreateSettingData) =>
      await client.post(`${url}/${params.id}/setting`, params.data),
    options
  );
export default useCreateNewSetting;
