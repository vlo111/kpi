
export interface IComponentChildren {
  children: React.ReactElement
  location?: string
}

export interface IAnsAlert {
  message: string
  type: any
  email?: string
}

export type TVoid = (params?: any) => void
