import { useMutation } from '@tanstack/react-query';
import client from '../client';

const useCreateApplicant: any = (options = {}) =>
  useMutation(
    async (params: { id: string, data: any, onlineSignaturePath: string }) => {
      if (params.id !== undefined) {
        return await client.post(`api/application-form/${params.id}/apply`, {
          apply: params.data,
          onlineSignaturePath: params.onlineSignaturePath
        });
      }
    },
    options
  );
export default useCreateApplicant;
