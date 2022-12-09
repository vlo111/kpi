import { IUser } from './auth';
import { Moment } from 'moment';
export interface IManagerIcon {
  letter: string
  color: string
  width?: string
  height?: string
  marginBottom?: string
  fontSize?: string
}
export interface ICreateTemplate {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser
}

export type OpenDeleteResultModal =
  | { remove: (name: string) => void, fields: string }
  | undefined

export type Date = Moment | null

export type DisabledDate = (current: Moment, item: string) => boolean

export interface IProjectOverview {
  overview?: boolean
}
