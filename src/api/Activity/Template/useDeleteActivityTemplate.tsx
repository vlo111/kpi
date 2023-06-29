import { useMutation } from '@tanstack/react-query';
import { DeleteTemplate, IOnlyId } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template';

const useDeleteActivityTemplate: DeleteTemplate = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(`${url}/${params.id}`);
    },
    options
  );
export default useDeleteActivityTemplate;
