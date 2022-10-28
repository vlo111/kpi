import React, { createContext, useContext, useMemo, useState } from 'react'

// @ts-expect-error
const ProjectContext: any = createContext()

export const ProjectProvider: any = ({ children }: any) => {
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
