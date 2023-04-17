import { useMutation } from '@tanstack/react-query';
import { DeleteTemplate, IOnlyId } from '../../../types/api/activity/template';

import client from '../../client';

const url = '/api/sub-activity/:id';

const useDeleteSubActivity: DeleteTemplate = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(url.replace(':id', params.id));
    },
    options
  );
export default useDeleteSubActivity;
