import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';
import { noop } from '../../helpers/utils';

import { URL_GET_PROJECTS } from './useGetProjects';
import { Void } from '../../types/global';
import { ProjectErrorResponse } from '../../types/project';

const url = 'api/project/:id';

const useEditProject: any = (params: { id: any }, {
  onSuccess = noop,
  ...restOptions
}: { onSuccess: Void, onError: ProjectErrorResponse }) => {
  const queryClient: any = useQueryClient();

  const mutation = useMutation(
    async (values) => await client.put(url.replace(':id', params.id), values),
    {
      ...restOptions,
      onSuccess: () => {
        queryClient.invalidateQueries([URL_GET_PROJECTS]);
        onSuccess();
      }
    }
  );
  return mutation;
};

export default useEditProject;
