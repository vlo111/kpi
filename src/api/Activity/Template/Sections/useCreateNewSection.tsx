import { useMutation } from '@tanstack/react-query';
import { CreateSection, IOnlyId } from '../../../../types/api/activity/template';

import client from '../../../client';

const url = 'api/activity/template';

const useCreateNewSection: CreateSection = (options = {}) =>
  useMutation(
    async (params: IOnlyId) =>
      await client.post(`${url}/${params.id}/section`),
    options
  );
export default useCreateNewSection;
