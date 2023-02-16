import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/invite/check';

const useGetIntivitationToken = (options = {}): any => {
  const mutation = useMutation((token): any => {
    return client.post(url, token);
  }, options);
  return mutation;
};

export default useGetIntivitationToken;
