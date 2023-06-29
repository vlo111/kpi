import { useMutation } from '@tanstack/react-query';

import client from '../client';
import { ICreateProjectData, UseCreateProject } from '../../types/api/project/get-project';

const url = 'api/project';

const useCreateProject: UseCreateProject = (options = {}) =>
  useMutation(async (projects: ICreateProjectData) => await client.post(url, projects), options);

export default useCreateProject;
