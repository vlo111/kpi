import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/sign-in';

const useSignInApi = (options = {}): any => {
  const mutation = useMutation((user): any => {
    return client.post(url, user);
  }, options);
  return mutation;
};

export default useSignInApi;
