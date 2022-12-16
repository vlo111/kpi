import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { UseCreateResultArea } from '../../types/api/project/get-project';

const url = 'api/project';

const useCreateResultArea: UseCreateResultArea = (options = {}) =>
  useMutation(async (params) => await client.post(`${url}/${params.id}/result-areas`, params.data), options);

export default useCreateResultArea;
