import React from 'react'
import { OpenDeleteResultModal } from './project'

export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface ConfirmModalType {
  open: boolean | OpenDeleteResultModal
  title: string
  yes: string
  no: string
  onSubmit: () => void
  onCancel: () => void
  styles?: any
}

export type FormFinish = (errorInfo: any) => void
