import { useMutation } from '@tanstack/react-query';

import client from '../client';

export const url = '/api/assessment-form/:id/apply';

const useApplyAssessmentForm: any = (options = {}) =>
  useMutation(
    async (params: any) => {
      if (params.id !== undefined) {
        return await client.post(url.replace(':id', params.id), params.requestBody);
      }
    },
    options
  );
export default useApplyAssessmentForm;
