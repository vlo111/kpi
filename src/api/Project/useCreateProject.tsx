import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/project';

const useCreateProject: any = (options = {}) => {
  const mutation = useMutation((projects): any => {
    return client.post(url, projects);
  }, options);
  return mutation;
};

export default useCreateProject;
