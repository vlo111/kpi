import { IUser } from './auth';
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
