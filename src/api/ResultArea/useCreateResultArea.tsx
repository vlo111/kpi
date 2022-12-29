import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { ICreateResultAreaData, UseCreateResultArea } from '../../types/api/project/get-project';

const url = 'api/project';

const useCreateResultArea: UseCreateResultArea = (options = {}) =>
  useMutation(async (params: ICreateResultAreaData) => await client.post(`${url}/${params.id}/result-areas`, params.data), options);

export default useCreateResultArea;
