import { useQuery } from '@tanstack/react-query';

import client from '../client';

export const URL_USER_ME = 'api/users/me';

const useCurrentUser = (params = {}, options = { enabled: true }): any => {
  const result = useQuery([URL_USER_ME, params], (): any => client.get(URL_USER_ME), {
    ...options,
    select: (data) => data.data
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : [])
  };
};

export default useCurrentUser;
