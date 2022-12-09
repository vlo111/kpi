import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { UseEditProject } from '../../types/api/project/get-project';

const url = 'api/project';

const useEditProject: UseEditProject = (options = {}) =>
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  useMutation(async (params) => await client.put(`${url}/${params.id}`, params.data), options);

export default useEditProject;
