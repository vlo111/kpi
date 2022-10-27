import { Moment } from 'moment'
import React from 'react'

export type DisabledDate = (current: Moment, item: string) => boolean

export type OnChange = (date: Moment | null, item: string) => void

export type Date = Moment | null

export type HandleSubmit = () => void

export type LayoutElement = Element & { style: React.CSSProperties } | null

export interface StepProps { setStep: (b: boolean) => void }

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

export interface IPanel { header: string, list: IPanelData[], deleteData: HandlePanelDelete, addData: HandlePanelAdd }

export interface IPanelData { id: string, name: string }

export type HandlePanelDelete = (header: string, id: string) => void

export type HandlePanelAdd = (header: string) => void

export interface IPanelIsActive { isActive: boolean }

export interface IPanelPropData { defaultActiveKey: string[], expandIcon: (panelProps: any) => React.ReactNode }

export interface IStepAction { current: number, onSubmit: (current: number) => void, stepLength: number }

export interface IStep { current: number }

export interface ExpectedResult {
  id: string
  code: string
  result: string
  measure: string
  target: number
}

export interface Activity {
  id: string
  code: string
  milestone: string
  measure: string
  target: number
}

export interface IResultArea {
  id: string
  name: string
  expectedResult: ExpectedResult[]
  activity: Activity[]
}
