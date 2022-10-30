import React, { createContext, useContext, useMemo, useState } from 'react'
import { IManager } from '../types/project'
import { ManagerList } from '../helpers/fakeData'

// @ts-expect-error
const ProjectContext: any = createContext()

export const ProjectProvider: any = ({ children }: any) => {
  const [current, setCurrent] = useState<number>(0)
  const [managers, setAddManager] = useState<IManager[]>(ManagerList)

  const prevCurrent: any = () => {
    setCurrent(current - 1)
  }

  const nextCurrent: () => void = () => {
    setCurrent(current + 1)
  }

  const addNewManager: (manager: IManager) => void = (manager) => {
    const newManagers: IManager[] = managers.slice(0)
    newManagers.push(manager)
    setAddManager(newManagers)
  }

  const value = useMemo(
    () => ({
      current,
      managers,
      prevCurrent,
      nextCurrent,
      addNewManager
    }),
    [current, managers]
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export const useProject: any = () => {
  return useContext(ProjectContext)
}
