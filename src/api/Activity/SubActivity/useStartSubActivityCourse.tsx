import { useMutation } from '@tanstack/react-query';

import { IOnlyId } from '../../../types/api/activity/template';
import client from '../../client';

const url = 'api/sub-activity/course';

const useStartSubActivityCourse: any = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.patch(`${url}/${params.id}/start`);
    },
    options
  );
export default useStartSubActivityCourse;
