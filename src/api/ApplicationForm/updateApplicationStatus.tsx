import { useMutation } from '@tanstack/react-query';
import { IOnlyId, UpdateApplicationStatus } from '../../types/api/application/applicationForm';
import client from '../client';

export const url = 'api/application-form';

const updateApplicationStatus: UpdateApplicationStatus = (options = {}) =>
  useMutation(
    async (params: IOnlyId) => {
      await client.patch(`${url}/${params.id}/status`);
    },
    options
  );
export default updateApplicationStatus;
