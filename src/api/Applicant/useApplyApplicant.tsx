import { useMutation } from '@tanstack/react-query';
import client from '../client';

const useCreateApplicant: any = (options = {}) =>
  useMutation(
    async (params: { id: string, data: any }) => {
      if (params.id !== undefined) {
        return await client.post(`api/application-form/${params.id}/apply`, {
          apply: params.data
        });
      }
    },
    options
  );
export default useCreateApplicant;
