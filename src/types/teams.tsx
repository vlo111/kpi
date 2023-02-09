import { TablePaginationConfig } from 'antd';
import { ResponseErrorParam } from './api/project/get-project';
import { FormOptions, UseMutation, Void } from './global';

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

export interface IEditUserInfo {
  lastName: string
  firstName: string
  email: string
  position: string | undefined
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
  userId: string
  setUserId: (b: string) => void
}

export interface ShowAddUserModalTypes {
  showModal: boolean
  setShowModal: (b: boolean) => void
}

export interface ShowDeleteUserModal {
  showModal?: string
  setShowModal: (b: string) => void
  totalCount?: number
  edit: boolean
  permissionsList: PermissionsResult
  userPermissions?: SingleUserPermissionResult[]
  userInfo?: IEditUserInfo
  setSearchText?: React.Dispatch<React.SetStateAction<string>>
}

export interface ITeamMembersTypes {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
  searchText?: string
  permissionsList: PermissionsResult
}

export interface PermissionsResult {
  id: string
  title: string
  resultAreas: PermissionsResultArea[]
  checked: boolean
}
export interface PermissionsResultArea {
  id: string
  title: string
  checked: boolean
  activities: Activity[]
}
export interface Activity {
  id: string
  title: string
  checked: boolean
  templates: Template[]
}

export interface Template {
  id: string
  title: string
  checked: boolean
}

export interface UseGetPermissionList {
  data: PermissionsResult
  isSuccess: boolean
  refetch: any
  isLoading: boolean

}

export interface ResultArea {
  id: string
  activities: Array<{
    id: string
    templates?: Array<{
      id: string
    }>
  }>
}

export interface CascadedData {
  id: string
  resultAreas: ResultArea[]
}

export type OnChangeType = (value: string[][]) => void;

export interface GetAllTeamsListParams {
  limit?: number
  offset?: number
  projectId: string
  search?: string
}
export interface GetAllTeamsListOptions { enabled: boolean }

export interface TeamData {
  result: User[]
  count: number
  has_more: boolean
}

export interface InvitePermission {
  id: string
  resultAreas: InviteMemberResultArea[]
}

export interface InviteMemberResultArea {
  id: string
  InviteMemberActivity: Activity[]
}

export interface SingleUserPermissionResult {
  level: number
  project: string
  resultArea: string
  inputActivity: string
  activityTemplate: string
}

export interface SingleUserPermissionResults {
  data: SingleUserPermissionResult[]
  isSuccess: boolean
  refetch: any
  isLoading: boolean
}

export interface InviteMemberActivity {
  id: string
  templates: InviteMemberTemplate[]
}

export interface InviteMemberTemplate {
  id: string
}

enum InviteMemberViewPermissions {
  VIEW,
  EDIT
}

type EnumInviteMemberViewPermissions = keyof typeof InviteMemberViewPermissions;

export interface InviteMemberData {
  firstName: string
  lastName: string
  email: string
  position?: string
  permissionType: EnumInviteMemberViewPermissions
  permissions: InvitePermission
}

export interface UseGetAllTeamsListResult {
  data: TeamData['result']
  count: TeamData['count']
  has_more: TeamData['has_more']
  isLoading: boolean
  refetch: any
}

export interface DeleteTeamMemberData {
  userId: string
  projectId: string
}

export type GetPermissionsList = (
  projectId: string,
  options?: FormOptions
) => UseGetPermissionList;

export type GetSingleUserPermissions = (
  userId: string,
  projectId: string,
  options?: FormOptions
) => SingleUserPermissionResults;

export type HandleTableOnChange = (pagination: TablePaginationConfig) => void

export type UseGetTeamMembers = (params: { limit: number, offset: number }, options?: { enabled: Boolean }) => Result

export type InviteTeamMemberPermission = UseMutation<Void, any, ResponseErrorParam, InviteMemberData>;

export type DeleteTeamMemberByUserId = UseMutation<Void, any, ResponseErrorParam, DeleteTeamMemberData>;
