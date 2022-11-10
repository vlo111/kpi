import React from 'react'

export interface IComponentChildren {
  children: React.ReactElement
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
