import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import client from '../client';

const url = 'api/auth/sign-in';

const useSignInApi: (options?: {}) => UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown> = (options = {}) => {
  const mutation = useMutation(async (user) => {
    return await client.post(url, user);
  }, options);
  return mutation;
};

export default useSignInApi;
