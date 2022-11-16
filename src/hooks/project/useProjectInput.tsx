import React, { createContext, useContext, useMemo, useState } from 'react'
import { IActivity, IExpectedResult, IMilestones, IResultArea } from '../../types/project'
import {
  DefaultActivity,
  DefaultExpectedResult,
  DefaultMilestone,
  DefaultResultArea,
  ResultArea
} from '../../helpers/fakeData'
import _ from 'lodash'
import { IComponentChildren } from '../../types/global'
import { ActionHandle, AddMilestone, DeleteActivity } from '../../types/context'

// @ts-expect-error
const ProjectInputContext = createContext()

export const ProjectInputProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [resultArea, setResultArea] = useState<IResultArea[]>(ResultArea)

  // ResultArea
  const addNewResultArea: () => void = () => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResult = Object.assign({}, DefaultResultArea())

    newResultArea.push(newResult)

    setResultArea(newResultArea)
  }

  const deleteResultArea: ActionHandle = (id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0).filter((r) => r.id !== id)

    setResultArea(newResultArea)
  }
  // ResultArea

  const addNewResult: ActionHandle = (id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === id)

    if (newResults) {
      const expectedResult = Object.assign({}, DefaultExpectedResult())

      newResults.expectedResult.push(expectedResult)

      setResultArea(newResultArea)
    }
  }

  const deleteExpectedResult: (resultAreaId: string, id: string) => void = (resultAreaId, id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === resultAreaId)

    if (!_.isEmpty(newResults)) {
      newResults.expectedResult = newResults.expectedResult.filter((m: IExpectedResult) => m.id !== id)

      setResultArea(newResultArea)
    }
  }

  // Activities
  const addNewActivity: ActionHandle = (id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === id)

    if (newResults) {
      const activity = Object.assign({}, DefaultActivity())

      newResults.activity.push(activity)

      setResultArea(newResultArea)
    }
  }

  const deleteActivity: DeleteActivity = (resultId, id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === resultId)

    if (!_.isEmpty(newResults)) {
      newResults.activity = newResults?.activity.filter((a: { id: string }) => a.id !== id)

      setResultArea(newResultArea)
    }
  }

  const addNewMilestone: AddMilestone = (resultId, activityId) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === resultId)

    if (!_.isEmpty(newResults)) {
      const activity: IActivity | undefined = Object.assign({}, newResults?.activity.find((a: { id: string }) => a.id === activityId))

      if (activity) {
        const milestone = Object.assign({}, DefaultMilestone())

        activity.milestones.push(milestone)

        setResultArea(newResultArea)
      }
    }
  }

  const deleteMilestone: (resultAreaId: string, activityId: string, id: string) => void = (resultAreaId, activityId, id) => {
    const newResultArea: IResultArea[] = resultArea.slice(0)

    const newResults: IResultArea | undefined = newResultArea.find(i => i.id === resultAreaId)

    if (!_.isEmpty(newResults)) {
      for (let i = 0; i < newResults?.activity.length; i++) {
        newResults.activity[i].milestones = newResults?.activity[i]?.milestones.filter((m: IMilestones) => m.id !== id)
      }
      setResultArea(newResultArea)
    }
  }
  // Activities

  const value = useMemo(
    () => ({
      resultArea,
      addNewResult,
      addNewMilestone,
      addNewActivity,
      addNewResultArea,
      deleteResultArea,
      deleteMilestone,
      deleteExpectedResult,
      deleteActivity
    }),
    [resultArea]
  )

  return <ProjectInputContext.Provider value={value}>{children}</ProjectInputContext.Provider>
}

export const useProjectInput: any = () => {
  return useContext(ProjectInputContext)
}
