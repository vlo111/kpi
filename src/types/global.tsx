import React from 'react'

export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface ConfirmModalType {
  open: boolean
  title: string
  onSubmit: () => void
  onCancel: () => void
  styles?: any
}
