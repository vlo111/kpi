import { useMutation } from '@tanstack/react-query';
import { AssignUserInCourse, IAssignUserParams } from '../../../types/api/activity/subActivity';

import client from '../../client';

const url = 'api/sub-activity';

const useAttacheFilesSubActivitySection: AssignUserInCourse = (options = {}) =>
  useMutation(
    async (params: IAssignUserParams) => {
      return await client.post(`${url}/${params.subActivityId}/assign/${params.userId}`);
    },
    options
  );
export default useAttacheFilesSubActivitySection;
