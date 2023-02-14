import { useMutation } from '@tanstack/react-query';
import { DeleteTeamMemberByUserId, DeleteTeamMemberData } from '../../types/teams';
import client from '../client';

export const url = '/api/users';

const useDeleteTeamMemberPermissionByInfo: DeleteTeamMemberByUserId = (options = {}) =>
  useMutation(
    async (params: DeleteTeamMemberData) => {
      return await client.delete(`${url}/${params.userId}/project/${params.projectId}`);
    },
    options
  );
export default useDeleteTeamMemberPermissionByInfo;
