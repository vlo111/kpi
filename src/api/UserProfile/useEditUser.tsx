import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noop } from '../../helpers/utils';

import client from '../client';
import { URL_USER_ME } from './useCurrentUser';

const url = 'api/users';

const useEditUser = ({ onSuccess = noop, ...restOptions }): any => {
  const queryClient = useQueryClient();
  const mutation = useMutation((values): any => client.put(url, values), {
    ...restOptions,
    onSuccess: () => {
      onSuccess();
      void queryClient.invalidateQueries([URL_USER_ME]);
    }
  });
  return mutation;
};

export default useEditUser;
