import { useMutation } from '@tanstack/react-query';
import { IUpdateSubActivityData } from '../../../types/api/activity/subActivity';
// import { CreateActivityTemplate, ICreateTemplateData } from '../../../types/api/activity/template';

import client from '../../client';

const url = 'api/sub-activity';

const useUpdateSubActivity: any = (options = {}) =>
  useMutation(
    async (params: IUpdateSubActivityData) => {
      if (params.id !== undefined) {
        return await client.put(`${url}/${params.id}`, params.data);
      }
    },
    options
  );
export default useUpdateSubActivity;
