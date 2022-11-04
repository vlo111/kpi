import React, { createContext, useContext, useMemo, useState } from 'react'
import { Activity, IResultArea } from '../../types/project'
import {
  DefaultActivity,
  DefaultExpectedResult,
  DefaultMilestone,
  DefaultResultArea,
  ResultArea
} from '../../helpers/fakeData'
import _ from 'lodash'
import { IComponentChildren } from '../../types/global'

// @ts-expect-error
const ProjectInputContext = createContext()

export const ProjectInputProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [resultArea, setResultArea] = useState<IResultArea[]>(ResultArea)

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
      const activity: Activity | undefined = Object.assign({}, newResults?.activity.find((a: { id: string }) => a.id === activityId))

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
      resultArea,
      addNewResult,
      addNewMilestone,
      addNewActivity,
      addNewResultArea
    }),
    [resultArea]
  )

  return <ProjectInputContext.Provider value={value}>{children}</ProjectInputContext.Provider>
}

export const useProjectInput: any = () => {
  return useContext(ProjectInputContext)
}
