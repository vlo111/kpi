import React, { createContext, useContext, useMemo } from 'react';

import { IComponentChildren } from '../types/global';
import { SetProjectId } from '../types/project';
import { useLocalStorage } from './useLocalStorage';

// @ts-expect-error
const ProjectContext = createContext();

export const ProjectProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [projectId, setId] = useLocalStorage('project', null);

  const setProjectId: SetProjectId = (id) => {
    setId(id);
  };

  const value = useMemo(
    () => ({
      projectId,
      setProjectId
    }),
    [projectId]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject: any = () => {
  return useContext(ProjectContext);
};
