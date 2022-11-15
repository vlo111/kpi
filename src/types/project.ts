import { Moment } from 'moment'
import React from 'react'

export type DisabledDate = (current: Moment, item: string) => boolean

export type OnChange = (date: Moment | null, item: string) => void

export type Date = Moment | null

export type HandleSubmit = () => void

export type LayoutElement = Element & { style: React.CSSProperties } | null

export interface StepProps { setStep: (b: boolean) => void }

export type FormItemName = (name: string) => { name: string, label: string }

export type Rules = (min: number, max: number) => { rules: [{ required: boolean, min: number, max: number }] }

export type InitialFields = (resultArea: IResultArea[]) => Array<{ name: string[], value: string }>

export interface AddManagers {
  setManagerModalOpen: (b: IManager | null) => void
  setAddManager: (b: any) => void
  manager: IManager | null
}

export interface IManager {
  id: string
  firstName: string
  lastName: string
  email: string
  position: string
  assigned: string
}

export type ManagerFieldType = (manager: (IManager | null)) => Array<{ name: string[], value: string | undefined }>

export interface IPanel { header: string, list: IPanelData[], deleteData: HandlePanelDelete, addData: HandlePanelAdd }

export interface IPanelData { id: string, name: string }

export type HandlePanelDelete = (header: string, id: string) => void

export type HandlePanelAdd = (header: string) => void

export interface IPanelIsActive { isActive: boolean }

export interface IPanelPropData { defaultActiveKey: string[], expandIcon: (panelProps: any) => React.ReactNode }

export interface IStepAction { current: number, onSubmit: (current: number) => void, stepLength: number }

export interface IStep { current: number }

export interface ExpectedResultType {
  id: string
  code: string
  result: string
  measure: string
  target: string
}

export interface Activity {
  id: string
  name: string
  milestones: Milestones[]
}

export interface Milestones {
  id: string
  code: string
  milestone: string
  measure: string
  target: string
}

export interface IResultArea {
  id: string
  name: string
  expectedResult: ExpectedResultType[]
  activity: Activity[]
}

export interface TabNames {
  tabNumber: number
  name: string
  zIndex: number
  active?: boolean
  handleActiveTab: React.Dispatch<React.SetStateAction<{}>>
  tabNames: object[]
}
export interface ActivityName {
  name: string
  active: number | undefined
  names: string[]
}

export interface activeTabName {
  number: null | number
  default: boolean
}

export interface TabName {
  name: string
}
export interface TabsNames {
  tabNames: TabName[]
  handleActiveTab: (tabNumber: any) => void
  activeTab: {
    number: number | null
    default: boolean
  }
}
export interface ActivityNamesProps {
  names: string[]
  activeName: number | undefined
  setActiveName: React.Dispatch<React.SetStateAction<number | undefined>>
}

export interface SubActivityProps {
  multiple: boolean
  activity: string
  subActivities: string[]
}
export interface GeneralInfoProps {
  title: string
  description: string
}
export interface ResultAndActivitiesProps {
  option: string
  description: string
  count: string
  divider: boolean
}

export interface ActivityNameProps {
  activityName: string
  divider: boolean
}
export interface ProjectsDetailProps {
  info: {
    title: string
    descriptions: string[]
  }
}
