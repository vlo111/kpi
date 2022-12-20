import { useMutation } from '@tanstack/react-query';
import { CreateActivityTemplate, ICreateTemplateData } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity';

const useCreateActivityTemplate: CreateActivityTemplate = (options = {}) =>
  useMutation(
    async (params: ICreateTemplateData) =>
      await client.post(`${url}/${(params.id != null) ? params.id : ''}/template`, params.data),
    options
  );
export default useCreateActivityTemplate;
