
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
