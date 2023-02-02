import { TablePaginationConfig } from 'antd';

export interface TemUsersType {
  status: string
  name: string
  email: string
  picture: string
  viewLevel: string
  key: string
}

export interface TableParams {
  pagination?: TablePaginationConfig
}

export interface UsersType {
  boolean: { status: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined }
  picture: {
    large: string | undefined }
  name: {
    first: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
    last: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }
}

export type TableGlobals = (params: {
  pagination?: TablePaginationConfig | undefined
  page?: number | undefined
  results?: number | undefined
}) => {
  pagination?: TablePaginationConfig
  page?: number | undefined
  results?: number | undefined
}

export interface ICascadeOnchange {
  setCascadeValue?: React.Dispatch<React.SetStateAction<string[]>>
  setFiledValue?: React.Dispatch<React.SetStateAction<string[]>>
}

export interface ShowPermissionModalTypes {
  showPermissionModal: boolean
  setShowPermissionModal: (b: boolean) => void
}

export interface ShowAddUserModalTypes {
  showModal: boolean
  setShowModal: (b: boolean) => void
}

export interface ShowDeleteUserModal {
  showModal?: string
  setShowModal: (b: string) => void
}

export interface ResultArea {
  resultAreaId: string
  activity: Array<{
    id: string
    template?: Array<{
      id: string
    }>
  }>
}

export interface CascadedData {
  projectId: string
  resultAreas: ResultArea[]
}

export type HandleTableOnChange = (pagination: TablePaginationConfig) => void
