import { useMutation } from '@tanstack/react-query';

import client from '../client';
const url = 'api/auth/sign-up';

const useSignUpApi = (options = {}) => {
  const mutation = useMutation((user) => {
    return client.post(url, user);
  }, options);
  return mutation;
};

export default useSignUpApi;
