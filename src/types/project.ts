import { Moment } from 'moment'
import React from 'react'

export type DisabledDate = (current: Moment, item: string) => boolean

export type Date = Moment | null

export type HandleSubmit = () => void

export interface StepProps {
  setStep: (b: boolean) => void
}

export type FormItemName = (name: string) => { id: string, label: string }

export type Rules = (
  min: number,
  max: number
) => { rules: [{ required: boolean, min: number, max: number }] }

export type InitResultAreaFields = (
  resultArea: IResultArea[]
) => Array<{ name: string[], value: string }>

export type InitGeneralInfoFields = (
  generalInfo: IGeneralInfo[]
) => Array<{ name: string[], value: string }>

export interface IAddManagers {
  setManagerModalOpen: (b: IManager | null) => void
  setAddManager: (b: any) => void
  manager: IManager | null
}

export interface IManager {
  id: string
  color: string
  firstName: string
  lastName: string
  email: string
  position: string
  assigned: string
}

export interface IManagerState {
  managers: IManager[]
  addNewManager: (manager: IManager) => void
  getManagerById: (id: string | null) => IManager | undefined
  deleteManagerById: (id: string | null) => void
  editManager: (manager: IManager) => void
}

export type ManagerFieldType = (
  manager: IManager | null
) => Array<{ name: string[], value: string | undefined }>

export interface IPanel {
  header: string
  list: IPanelData[]
  deleteData: HandlePanelDelete
  addData: HandlePanelAdd
}

export interface IPanelData {
  id: string
  name: string
}

export type HandlePanelDelete = (header: string, id: string) => void

export type HandlePanelAdd = (header: string) => void

export interface IPanelIsActive {
  isActive: boolean
}

export interface IExpectedResult {
  id: string
  code: string
  result: string
  measure: string
  target: string
}

export interface IActivity {
  id: string
  name: string
  milestones: IMilestones[]
}

export interface IMilestones {
  id: string
  code: string
  milestone: string
  measure: string
  target: string
}

export interface IResultArea {
  id: string
  name: string
  expectedResult: IExpectedResult[]
  activity: IActivity[]
}

export interface IGeneralInfo {
  title: string
  description: string
  startDate: Date
  endDate: Date
  managers: IManager[]
}

export interface IManagerIcon {
  letter: string
  color: string
}

export interface IManagerOverview {
  id: string | null
  setOverview: any
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
