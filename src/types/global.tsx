import React from 'react'

export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface ConfirmModalType {
  open: boolean
  title: string
  yes: string
  no: string
  onSubmit: () => void
  onCancel: () => void
  styles?: any
}

export type FinishFailed = (errorInfo: any) => void
