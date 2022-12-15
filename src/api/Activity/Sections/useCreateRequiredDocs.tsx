import { useMutation } from '@tanstack/react-query';
import { CreateRequiredDocs, ICreateRequiredDocsData } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template/section';

const useCreateRequiredDocs: CreateRequiredDocs = (options = {}) =>
  useMutation(
    async (params: ICreateRequiredDocsData) =>
      await client.post(`${url}/${params.id}/required-docs`, params.data),
    options
  );
export default useCreateRequiredDocs;
