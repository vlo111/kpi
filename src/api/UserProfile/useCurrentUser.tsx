import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';

import client from '../client';

export const URL_USER_ME = 'api/users/me';

const useCurrentUser = (params = {}, options = { enabled: true }): any => {
  const { user, login } = useAuth();
  const result = useQuery([URL_USER_ME, params], (): any => client.get(URL_USER_ME), {
    ...options,
    select: (data) => data.data,
    onSuccess: (data) => {
      login({
        ...user,
        firstName: data?.firstName,
        lastName: data?.lastName
      });
    }
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : [])
  };
};

export default useCurrentUser;