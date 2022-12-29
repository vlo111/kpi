import { useMutation } from '@tanstack/react-query';
import { IOnlyId, PublishActivityTemplate } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template';

const usePublishActivityTemplate: PublishActivityTemplate = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => await client.post(`${url}/${params.id}/publish`),
    options
  );
export default usePublishActivityTemplate;
