import { Moment } from 'moment'
import React from 'react'

export type DisabledDate = (current: Moment, item: string) => boolean

export type OnChange = (date: Moment | null, item: string) => void

export type Date = Moment | null

export type HandleSubmit = () => void

export type LayoutElement = Element & { style: React.CSSProperties } | null

export interface StepProps { setStep: (b: boolean) => void }

export interface AddManagers {
  setManagerModalOpen: (b: Manager | null) => void
  setAddManager: (b: any) => void
  manager: Manager | null
}

export interface Manager {
  id: string
  firstName: string
  lastName: string
  email: string
  position: string
  assigned: string
}
