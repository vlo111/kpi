import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../types/api/activity/template';
import client from '../client';

export const url = 'api/application-form';

const duplicateApplicationForm: any = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/duplicate`);
      }
    },
    options
  );
export default duplicateApplicationForm;
