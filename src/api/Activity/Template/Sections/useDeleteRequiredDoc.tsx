import { useMutation } from '@tanstack/react-query';
import { DeleteRequiredDoc, IOnlyId } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template/section/required-docs';

const useDeleteRequiredDocs: DeleteRequiredDoc = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(`${url}/${params.id}`);
    },
    options
  );
export default useDeleteRequiredDocs;
