import { useMutation } from '@tanstack/react-query';
import { CreateApplicationFormType, ICreateApplicationForm } from '../../types/api/application/applicationForm1';
import client from '../client';

export const url = 'api/application-form';

const createApplicationForm: CreateApplicationFormType = (options = {}) =>
  useMutation(
    async (params: ICreateApplicationForm) => {
      if (params.id !== undefined) {
        return await client.post(`${url}/course/${params.id}`, params.data);
      }
    },
    options
  );
export default createApplicationForm;
