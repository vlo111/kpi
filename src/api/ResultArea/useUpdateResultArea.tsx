import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { UseCreateResultArea } from '../../types/api/project/get-project';

const url = 'api/project';

const useUpdateResultArea: UseCreateResultArea = (options = {}) =>
  useMutation(async (params) => await client.put(`${url}/${params.id}/result-areas`, params.data), options);

export default useUpdateResultArea;
