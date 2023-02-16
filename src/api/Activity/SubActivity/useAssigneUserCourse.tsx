import { useMutation } from '@tanstack/react-query';
import { AssignUserInCourse, IAssignUserParams } from '../../../types/api/activity/subActivity';

import client from '../../client';

const url = 'api/sub-activity';

const useAssignUserInCoresById: AssignUserInCourse = (options = {}) =>
  useMutation(
    async (params: IAssignUserParams) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return await client.post(`${url}/${params.subActivityId}/assign/${params.userId}`);
    },
    options
  );
export default useAssignUserInCoresById;
