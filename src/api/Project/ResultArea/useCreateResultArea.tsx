import { useMutation } from '@tanstack/react-query';

import client from '../../client';
import { UseCreateResultArea } from '../../../types/api/project/get-project';

const url = 'api/project';

const useCreateResultArea: UseCreateResultArea = (options = {}) =>
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  useMutation(async (params) => await client.post(`${url}/${params.id}/result-areas`, params.data), options);

export default useCreateResultArea;
