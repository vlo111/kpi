import React, { createContext, useContext, useMemo, useState } from 'react'
import { IComponentChildren } from '../../types/global'

// @ts-expect-error
const ProjectContext = createContext()

export const ProjectProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0)

  const prevCurrent: any = () => {
    setCurrent(current - 1)
  }

  const nextCurrent: () => void = () => {
    setCurrent(current + 1)
  }

  const value = useMemo(
    () => ({
      current,
      prevCurrent,
      nextCurrent
    }),
    [current]
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export const useProject: any = () => {
  return useContext(ProjectContext)
}
