import { useMutation } from '@tanstack/react-query';
import { DeleteApplicationForm, IOnlyId } from '../../types/api/application/applicationForm';
import client from '../client';

const url = 'api/application-form';

const useDeleteApplicationForm: DeleteApplicationForm = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.delete(`${url}/${params.id}`);
    },
    options
  );
export default useDeleteApplicationForm;
