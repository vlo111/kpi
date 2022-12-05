import { OpenDeleteResultModal } from './project';

export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface IAnsAlert {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  email?: string
}

export type TVoid = (params?: any) => void

export interface ConfirmModalType {
  open: boolean | OpenDeleteResultModal
  title: string
  yes: string
  no: string
  onSubmit: () => void
  onCancel: () => void
  styles?: { gap: string }
}
