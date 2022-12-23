export interface IDisableType {
  tabDisable?: boolean
  setTabDisable: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IDraggerProps {
  text?: string | undefined
  padding?: string | undefined
}

export interface IUserListTypes {
  key: React.Key
  name: string
  email: string
  status: string
}

export interface IWrapperProps {
  children: React.ReactNode
  className?: string | undefined
  margin?: number | undefined
}
