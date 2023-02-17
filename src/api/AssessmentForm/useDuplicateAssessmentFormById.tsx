import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../types/api/activity/template';
import { DuplicateAssessmentFormByFormId } from '../../types/api/assessment';
import client from '../client';

export const url = 'api/assessment-form';

const DuplicateAssessmentFormDataById: DuplicateAssessmentFormByFormId = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/${params.id}/duplicate`);
      }
    },
    options
  );
export default DuplicateAssessmentFormDataById;
