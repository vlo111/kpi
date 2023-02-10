import { useMutation } from '@tanstack/react-query';
import { UpdateMemberPermissionsId, UseUpdatePermissionData } from '../../types/teams';
import client from '../client';

export const url = '/api/users';

const useUpdateMemberPermissionsId: UpdateMemberPermissionsId = (options = {}) =>
  useMutation(
    async (params: UseUpdatePermissionData) => {
      return await client.put(`${url}/${params.userId}/permissions/${params.projectId}`, params.data);
    },
    options
  );
export default useUpdateMemberPermissionsId;
