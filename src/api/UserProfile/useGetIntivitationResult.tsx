import { useMutation } from '@tanstack/react-query';
import client from '../client';

const url = 'api/auth/password/reset';

const useGetIntivitationResult: any = (options = {}) => {
  const mutation = useMutation((newPassword): any => {
    return client.post(url, newPassword);
  }, options);
  return mutation;
};

export default useGetIntivitationResult;

