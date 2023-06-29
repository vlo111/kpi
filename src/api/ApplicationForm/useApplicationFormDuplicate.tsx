import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../types/api/activity/template';
import { DuplicateApplicationFormType } from '../../types/api/application/applicationForm';
import client from '../client';

export const url = 'api/application-form';

const duplicateApplicationForm: DuplicateApplicationFormType = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/duplicate`);
      }
    },
    options
  );
export default duplicateApplicationForm;
