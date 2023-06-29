import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  InviteMemberData,
  InviteTeamMemberPermission
} from '../../types/teams';
import client from '../client';
import { USE_GET_TEAM_LIST } from './useGetAllTeamMembersList';

export const url = '/api/auth/invite';

const useInviteMemberByPermission: InviteTeamMemberPermission = ({
  onSuccess,
  ...restOptions
}: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: InviteMemberData) => {
      return await client.post(url, params);
    },
    {
      ...restOptions,
      onSuccess: () => {
        void onSuccess();
        void queryClient.invalidateQueries([USE_GET_TEAM_LIST]);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useInviteMemberByPermission;
