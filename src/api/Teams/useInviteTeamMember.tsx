import { useMutation } from '@tanstack/react-query';
import { InviteMemberData, InviteTeamMemberPermission } from '../../types/teams';
import client from '../client';

export const url = '/api/auth/invite';

const useInviteMemberByPermission: InviteTeamMemberPermission = (options = {}) =>
  useMutation(
    async (params: InviteMemberData) => {
      return await client.post(url, params);
    },
    options
  );
export default useInviteMemberByPermission;
