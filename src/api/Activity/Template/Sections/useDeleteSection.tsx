import { useMutation } from '@tanstack/react-query';
import { DeleteSection, IOnlyId } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template/section';

const useDeleteSection: DeleteSection = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(`${url}/${params.id}`);
    },
    options
  );
export default useDeleteSection;
