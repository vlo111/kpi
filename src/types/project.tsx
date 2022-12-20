import { IUser } from './auth';
import { Moment } from 'moment';
import { FormListFieldData } from 'antd';
import { Void } from './global';
import { ReactElement } from 'react';

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
  id?: string | undefined
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

export interface IProjectExpectedResults {
  id?: string
  code: string
  target: number
  statement: string
  divider?: boolean
}
export interface IProjectInputActivities {
  order: number
  id: string
  title: string
  milestones: IProjectMilestones[]
}
export interface IProjectMilestones {
  id: string
  statement: string
  target: number
  code: string
}
export interface IProjectResultAreas {
  id: string
  title: string
  expectedResults: IProjectExpectedResults[]
  inputActivities: IProjectInputActivities[]
}
export interface IGeneralInfoProps {
  title: string
  description: string
  startDate: string
  endDate: string
}

export interface IActivityName {
  divider: boolean
  count: boolean
  activityName: string
  order: number
}

export interface IProjectDetailsProps {
  title: string
  details: IProjectDetailsData[]
}

export interface IResulAreaConfirmModal { open: boolean, onSave: Void, onCancel: Void, onNotSave: Void }
export interface IHelpText {
  id: string
  value: string
}

export interface ICreateTemplateModal {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
  activityId: string | undefined
}

export type AddManagerHandle = (values: unknown) => void

export interface ISection {
  [x: string]: number
}

export interface ILearningStatus {
  section: any // ISection
}

export interface IRequiredDocuments {
  documentName: string
  documentCount: number
  id: string
}

export interface IAddRequiredDocument {
  isOpenAddDocumentsModal: boolean
  setIsOpenAddDocumentsModal: React.Dispatch<React.SetStateAction<boolean>>
  requiredDocuments: IRequiredDocuments[]
  setRequiredDocuments: React.Dispatch<React.SetStateAction<IRequiredDocuments[]>>
}

export interface IAddedDocuments {
  requiredDocuments: IRequiredDocuments[]
  setRequiredDocuments: React.Dispatch<React.SetStateAction<IRequiredDocuments[]>>
}

export interface ICreateFieldsProps {
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
  questionType: string
  form: any
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
  templateId: string | undefined
}

export type ContentType = (id: string) => ReactElement

export interface ITemplateData {
  id: string
  title: string
  subTitle: string[] | []
  option: string[] | []
  switch: boolean
  disabled: boolean
  status: number
}

export interface IQuestionsRow {
  item: any // ITemplateData
  templateData: ITemplateData[]
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateData[]>>
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
  helpTextValue: IHelpText[]
  setHelpTextValue: React.Dispatch<React.SetStateAction<IHelpText[]>>
  refetch: any
}

export type SetProjectId = (id: string) => void

export type ResultAreaOrder = (index: number) => number
