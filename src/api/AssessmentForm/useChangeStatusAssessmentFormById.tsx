import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../types/api/activity/template';
import { ChangeStatusAssessmentFormByFormId } from '../../types/api/assessment';
import client from '../client';

export const url = 'api/assessment-form';

const changeStatusAssessmentFormDataById: ChangeStatusAssessmentFormByFormId = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.patch(`${url}/${params.id}/status`);
      }
    },
    options
  );
export default changeStatusAssessmentFormDataById;
