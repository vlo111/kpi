import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  UpdateMemberPermissionsId,
  UseUpdatePermissionData
} from '../../types/teams';
import client from '../client';
import { USE_GET_TEAM_LIST } from './useGetAllTeamMembersList';

export const url = '/api/users';

const useUpdateMemberPermissionsId: UpdateMemberPermissionsId = ({
  onSuccess,
  ...restOptions
}: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: UseUpdatePermissionData) => {
      return await client.put(
        `${url}/${params.userId}/permissions/${params.projectId}`,
        params.data
      );
    },
    {
      ...restOptions,
      onSuccess: () => {
        void onSuccess();
        void queryClient.invalidateQueries([USE_GET_TEAM_LIST]);
      },
      onError: () => message.error('Something went wrong !!', 2)
    }
  );
};
export default useUpdateMemberPermissionsId;
