import { useMutation } from '@tanstack/react-query';
import { UpdateAssessmentFormByFormId, UpdateAssessmentFormData } from '../../types/api/assessment';
import client from '../client';

export const url = 'api/assessment-form';

const UpdateAssessmentFormDataById: UpdateAssessmentFormByFormId = (options = {}) =>
  useMutation(
    async (params: UpdateAssessmentFormData) => {
      if (params.formId !== undefined) {
        return await client.put(`${url}/${params.formId}`, params.data);
      }
    },
    options
  );
export default UpdateAssessmentFormDataById;
