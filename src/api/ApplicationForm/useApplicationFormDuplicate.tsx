import { useMutation } from '@tanstack/react-query';
import client from '../client';

export const url = 'api/application-form';

const duplicateApplicationForm: any = (options = {}) =>
  useMutation(
    async (params: any) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/duplicate`, params.data);
      }
    },
    options
  );
export default duplicateApplicationForm;
