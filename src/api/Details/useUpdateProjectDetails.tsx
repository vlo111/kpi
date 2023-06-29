import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { UseCreateProjectDetails } from '../../types/api/project/get-project';

const url = 'api/project';

const useUpdateProjectDetails: UseCreateProjectDetails = (options = {}) =>
  useMutation(async (params) => await client.put(`${url}/${params.id}/project-details`, params.data), options);

export default useUpdateProjectDetails;
