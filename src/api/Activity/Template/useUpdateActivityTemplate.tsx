import { useMutation } from '@tanstack/react-query';
import { IUpdateActivityTemplate, IUpdateTemplateData } from '../../../types/api/activity/template';

import client from '../../client';

const url = '/api/activity/template/:id';

const useUpdateActivityTemplate: IUpdateActivityTemplate = (options = {}) =>
  useMutation(
    async (params: IUpdateTemplateData) => {
      if (params?.id !== undefined) {
        return (await client.put(url.replace(':id', params.id), params.data));
      }
    }, options
  );
export default useUpdateActivityTemplate;
