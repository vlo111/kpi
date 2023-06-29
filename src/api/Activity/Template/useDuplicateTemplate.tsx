import { useMutation } from '@tanstack/react-query';
import { DuplicateTemplate, IOnlyId } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template';

const useDuplicateTemplate: DuplicateTemplate = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => await client.post(`${url}/${params.id}/duplicate`),
    options
  );
export default useDuplicateTemplate;
