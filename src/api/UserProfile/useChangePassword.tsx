import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/password';

const useChangePassword = (options = {}): any => {
  const mutation = useMutation((password): any => {
    return client.put(url, password);
  }, options);
  return mutation;
};

export default useChangePassword;
