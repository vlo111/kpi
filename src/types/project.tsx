import { IUser } from './auth';
import { Moment } from 'moment';
import { FormListFieldData } from 'antd';
import { Void } from './global';

export interface ICreateTemplate {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser
}

export type OpenDeleteResultModal =
  | { remove: (name: string) => void, fields: string, title: string }
  | undefined;

export type Date = Moment | null;

export type DisabledDate = (current: Moment, item: string) => boolean;

export interface ICreateProject {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  stepStatus: string
}

export type ProjectErrorResponse = (data: {
  response: { status: number, data: { message: string } }
}) => void;

export type ProjectSuccessResponse = (response: {
  status: number
  data: { id: string }
}) => void;

export type SetResultArea = (values: FormData) => void;

export type SetTitleColor = (element: HTMLElement, color: string) => void;

export type CollapseHeader = (
  key: number | string,
  name: Array<number | string>,
  index: string,
  placeholder: string,
  className: string
) => JSX.Element;

export interface IPanelIsActive {
  isActive: boolean
}

export interface ProjectInputBoxProps {
  resultId: number
  activityId?: number
  type: string
  list: FormListFieldData[]
  add: (defaultValue?: any, insertIndex?: number | undefined) => void
  remove: (index: number | number[]) => void
  onDelete: (
    remove: (index: number | number[]) => void,
    field: number,
  ) => void
}

export interface IResultBox {
  code?: string
  statement?: string
  measurement: string
  target?: number
}

export interface IInputActivities {
  title: string
  order: number
  milestones: IResultBox[]
}

export interface IResultAreaData {
  expectedResults: IResultBox[]
  inputActivities: IInputActivities[]
  title: string
  order: number
}

export interface IResultAreas {
  title: string
  id: string
  inputActivities: IInputActivities[]
}
export interface IProjectDetailsData {
  id: string
  title: string
}

export interface IProjectDetails {
  deletedSectorIds: string[]
  deletedOrganizationIds: string[]
  deletedRegionIds: string[]
  organizations: IProjectDetailsData[]
  sectors: IProjectDetailsData[]
  regions: IProjectDetailsData[]
}

export interface IProjectDetailsItems {
  title: string
  name: string
  onDelete: (remove: (name: string) => void, fields: string, title: string) => void
}

export interface IProjectModalDelete {
  remove: (name: number | number[]) => void
  field: number
  title: string
  activityName?: number
}

export interface IProjectResultAreaDelete {
  remove: (name: number | number[]) => void
  field: number
}

export type OnDeleteBoxHandler = (
  remove: (index: number | number[]) => void,
  field: number,
  title: string,
  activityName?: number
) => void

export type OnDeleteExpectedHandler = (
  remove: (index: number | number[]) => void,
  field: number
) => void

export type ProjectDetailsDelete = (remove: (name: string) => void, fields: string, title: string) => void

export type DeleteResultArea = (remove: (name: number | number[]) => void, field: number) => void

export interface ProjectDetails {
  organizations: string[]
  sectors: string[]
  regions: string[]
}

export interface IResulAreaConfirmModal { open: boolean, onSave: Void, onCancel: Void, onNotSave: Void }
