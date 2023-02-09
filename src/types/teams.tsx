import { TablePaginationConfig } from 'antd';

export interface TemUsersType {
  status: string
  name: string
  email: string
  picture: string
  viewLevel: string
  key: string
}

export interface User {
  emailVerified: boolean
  id: string
  firstName: string
  lastName: string
  organization: string
  email: string
  phone?: string
  photo?: string
  position?: string
  admin: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface Result {
  result: User[]
  count: number
  has_more: boolean
}

export interface TableParams {
  pagination?: TablePaginationConfig
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
  totalCount?: number
  setSearchText?: React.Dispatch<React.SetStateAction<string>>
}

export interface ITeamMembersTypes {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
  searchText?: string
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

export type OnChangeType = (value: string[][]) => void;

export interface GetAllTeamsListParams {
  limit: number | undefined
  offset: number
  search?: string
}
export interface GetAllTeamsListOptions { enabled: boolean }

export interface TeamData {
  result: User[]
  count: number
  has_more: boolean
}

export interface UseGetAllTeamsListResult {
  data: TeamData['result']
  count: TeamData['count']
  has_more: TeamData['has_more']
  isLoading: boolean
  refetch: any
}

export type HandleTableOnChange = (pagination: TablePaginationConfig) => void

export type UseGetTeamMembers = (params: { limit: number, offset: number }, options?: { enabled: Boolean }) => Result
