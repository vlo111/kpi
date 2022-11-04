import React, { createContext, useContext, useMemo, useState } from 'react'
import { Date, IManager } from '../../types/project'
import {
  ManagerList
} from '../../helpers/fakeData'
import { IComponentChildren } from '../../types/global'

// @ts-expect-error
const GeneralInfoContext = createContext()

export const GeneralInfoProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()

  const [managers, setAddManager] = useState<IManager[]>(ManagerList())

  const [startDate, setStartDate] = useState<Date>(null)
  const [endDate, setEndDate] = useState<Date>(null)

  const addNewManager: (manager: IManager) => void = (manager) => {
    const newManagers: IManager[] = managers.slice(0)
    newManagers.push(manager)
    setAddManager(newManagers)
  }

  const value = useMemo(
    () => ({
      title,
      description,
      managers,
      startDate,
      endDate,
      setTitle,
      setDescription,
      setStartDate,
      setEndDate,
      addNewManager
    }),
    [managers, startDate, endDate, title, description]
  )

  return <GeneralInfoContext.Provider value={value}>{children}</GeneralInfoContext.Provider>
}

export const useGeneralInfo: any = () => {
  return useContext(GeneralInfoContext)
}
