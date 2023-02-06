import { useMutation } from '@tanstack/react-query';
import { IOnlyId } from '../../types/api/activity/template';
import { DeleteAssessmentFormByFormId } from '../../types/api/assessment';
import client from '../client';

export const url = 'api/assessment-form';

const DeleteAssessmentFormDataById: DeleteAssessmentFormByFormId = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      if (params.id !== undefined) {
        return await client.delete(`${url}/${params.id}`);
      }
    },
    options
  );
export default DeleteAssessmentFormDataById;
