import { useMutation, useQueryClient } from '@tanstack/react-query';
import { noop } from '../../helpers/utils';
import { useProject } from '../../hooks/useProject';

import client from '../client';
import { URL_USER_ME } from './useCurrentUser';

const url = 'api/users';

const useEditUser = ({ onSuccess = noop, ...restOptions }): any => {
  const { projectId }: { projectId: string } = useProject();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (values: { projectId: string, userData: any }) => await client.put(`${url}/project/${values.projectId}`,
      values.userData), {
      ...restOptions,
      onSuccess: () => {
        onSuccess();
        void queryClient.invalidateQueries([`${URL_USER_ME}/project/${projectId}`]);
      }
    });
  return mutation;
};

export default useEditUser;
