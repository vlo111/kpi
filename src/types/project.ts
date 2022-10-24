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

export type PanelType = React.FC<{ header: string, list: IPanelData[], deleteData: any }>

export interface IPanelData { id: string, name: string }

export interface IPanelIsActive { isActive: boolean }

export interface IPanelPropData { defaultActiveKey: string[], expandIcon: (panelProps: any) => React.ReactNode }

export interface IStepAction { current: number, onSubmit: (current: number) => void, stepLength: number }

export interface IStep { current: number }
