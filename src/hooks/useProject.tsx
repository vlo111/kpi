import React, { createContext, useContext, useMemo, useState } from 'react'
import { Activity, IManager, IResultArea } from '../types/project'
import {
  DefaultActivity,
  DefaultExpectedResult,
  DefaultMilestone,
  DefaultResultArea,
  ManagerList,
  ResultArea
} from '../helpers/fakeData'
import _ from 'lodash'

// @ts-expect-error
const ProjectContext: any = createContext()

export const ProjectProvider: any = ({ children }: any) => {
  const [current, setCurrent] = useState<number>(1)
  const [managers, setAddManager] = useState<IManager[]>(ManagerList)
  const [resultArea, setResultArea] = useState<IResultArea[]>(ResultArea)

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

  const addNewResult: (id: string) => void = (id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === id)

    if (newResults) {
      const expectedResult = Object.assign({}, DefaultExpectedResult())

      newResults.expectedResult.push(expectedResult)

      setResultArea(newResultArea)
    }
  }

  const addNewActivity: (id: string) => void = (id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === id)

    if (newResults) {
      const activity = Object.assign({}, DefaultActivity())

      newResults.activity.push(activity)

      setResultArea(newResultArea)
    }
  }

  const addNewMilestone: (resultId: string, activityId: string) => void = (resultId, activityId) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === resultId)

    if (!_.isEmpty(newResults)) {
      const activity: Activity | undefined = Object.assign({}, newResults.activity.find((a) => a.id === activityId))

      if (activity) {
        const milestone = Object.assign({}, DefaultMilestone())

        activity.milestones.push(milestone)

        setResultArea(newResultArea)
      }
    }
  }

  const addNewResultArea: () => void = () => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResult = Object.assign({}, DefaultResultArea())

    newResultArea.push(newResult)

    setResultArea(newResultArea)
  }

  const value = useMemo(
    () => ({
      current,
      managers,
      resultArea,
      prevCurrent,
      nextCurrent,
      addNewManager,
      addNewResult,
      addNewMilestone,
      addNewActivity,
      addNewResultArea
    }),
    [current, managers, resultArea]
  )

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export const useProject: any = () => {
  return useContext(ProjectContext)
}
