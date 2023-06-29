import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/password/forget';

const useForgotPassword = (options = {}): any => {
  const mutation = useMutation((email): any => {
    return client.post(url, email);
  }, options);
  return mutation;
};

export default useForgotPassword;
