import { useMutation } from '@tanstack/react-query';
import { AddSettingHelpText, IAddSettingHelpText } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template/setting';

const useAddSettingHelpText: AddSettingHelpText = (options = {}) =>
  useMutation(
    async (params: IAddSettingHelpText) =>
      await client.post(`${url}/${params.id}/help-text`, params.data),
    options
  );
export default useAddSettingHelpText;
