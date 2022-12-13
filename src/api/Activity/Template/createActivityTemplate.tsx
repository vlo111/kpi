import { useMutation } from '@tanstack/react-query';
import { ICreateTemplate } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity';

const useCreateActivityTemplate: any = (options = {}) =>
  useMutation(
    async (params: ICreateTemplate) =>
      await client.post(`${url}/${params.id}/template`, params.data),
    options
  );
export default useCreateActivityTemplate;
