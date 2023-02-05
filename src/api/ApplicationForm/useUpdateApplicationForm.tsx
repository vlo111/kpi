import { useMutation } from '@tanstack/react-query';
import { CreateApplicationFormType, ICreateApplicationForm } from '../../types/api/application/applicationForm1';

import client from '../client';

const url = 'api/application-form';

const useUpdateApplicationForm: any = (options: any) =>
  useMutation(
    async (params: ICreateApplicationForm) => {
      if (params.id != null) {
        return await client.put(`${url}/${params.id}`, params.data);
      }
    },
    options
  );
export default useUpdateApplicationForm;
