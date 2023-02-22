import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { AssignUserInCourse, IAssignUserParams } from '../../../types/api/activity/subActivity';

import client from '../../client';

const url = 'api/sub-activity';

const useAssignUserInCoresById: AssignUserInCourse = ({
  onSuccess,
  ...restOptions
}: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: IAssignUserParams) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return await client.post(`${url}/${params.subActivityId}/assign/${params.userId}`);
    },
    {
      ...restOptions,
      onSuccess: () => {
        void onSuccess();
        void queryClient.invalidateQueries(['/api/sub-activity']);
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => message.error(error, 2)
    }
  );
};
export default useAssignUserInCoresById;
