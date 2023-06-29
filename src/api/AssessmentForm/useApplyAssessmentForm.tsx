import { useMutation } from '@tanstack/react-query';
import { TUseApplyAssessMentForm, IApplyAssessMentForm } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form/:id/apply';

const useApplyAssessmentForm: TUseApplyAssessMentForm = (options = {}) =>
  useMutation(
    async (params: IApplyAssessMentForm) => {
      if (params.id !== undefined) {
        return await client.post(url.replace(':id', params.id), params.requestBody);
      }
    },
    options
  );
export default useApplyAssessmentForm;
