import { useMutation } from '@tanstack/react-query';
import { TUseAssessForm, IAssessForm } from '../../types/api/assessment';
import client from '../client';

export const url = '/api/assessment-form/assess/:id';

const useAssessForm: TUseAssessForm = (options = {}) =>
  useMutation(
    async (params: IAssessForm) => {
      if (params.formId !== undefined) {
        return await client.post(url.replace(':id', params.formId), params.requestBody);
      }
    },
    options
  );
export default useAssessForm;
