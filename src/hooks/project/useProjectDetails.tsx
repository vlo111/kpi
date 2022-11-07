import React, { createContext, useContext, useMemo, useState } from 'react'
import { IComponentChildren } from '../../types/global'

// @ts-expect-error
const ProjectDetailsContext = createContext()

export const ProjectDetailsProvider: React.FC<IComponentChildren> = ({ children }) => {
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

  return <ProjectDetailsContext.Provider value={value}>{children}</ProjectDetailsContext.Provider>
}

export const useProjectDetails: any = () => {
  return useContext(ProjectDetailsContext)
}
