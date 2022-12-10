import { useMutation } from '@tanstack/react-query';

import client from '../../client';
import { UseCreateProjectDetails } from '../../../types/api/project/get-project';

const url = 'api/project';

const useCreateProjectDetails: UseCreateProjectDetails = (options = {}) =>
  useMutation(async (params) => await client.post(`${url}/${params.id}/project-details`, params.data), options);

export default useCreateProjectDetails;
