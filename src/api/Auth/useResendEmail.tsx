import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/email/resend';

const useResendEmail = (options = {}): any => {
  const mutation = useMutation((email): any => {
    return client.post(url, email);
  }, options);
  return mutation;
};

export default useResendEmail;
