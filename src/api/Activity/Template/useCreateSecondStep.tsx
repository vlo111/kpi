import { useMutation } from '@tanstack/react-query';
import { CreateSecondStepTemplate, ICreateSecondStepData } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/activity/template';

const useCreateSecondStepTemplate: CreateSecondStepTemplate = (options = {}) =>
  useMutation(
    async (params: ICreateSecondStepData) =>
      await client.post(`${url}/${params.id}/second-step`, params.data),
    options
  );
export default useCreateSecondStepTemplate;
