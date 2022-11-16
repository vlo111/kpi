import { IManager } from './project'

export type DeleteManagerById = (id: string | null) => void

export type GetManager = (id: string | null) => IManager | undefined

export type EditManager = (manager: IManager) => void

export type AddManager = (manager: IManager) => void

export type AddMilestone = (resultId: string, activityId: string) => void

export type DeleteActivity = (resultId: string, id: string) => void

export type ActionHandle = (id: string) => void
