import { IUser } from './auth';
import { Moment } from 'moment';
import { FormListFieldData } from 'antd';
import { Void } from './global';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

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
  id?: string
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
  deletedSectorIds?: string[]
  deletedOrganizationIds?: string[]
  deletedRegionIds?: string[]
  organizations: IProjectDetailsData[]
  sectors: IProjectDetailsData[]
  regions: IProjectDetailsData[]
  publish?: boolean
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
  organizations: IOrganizations[]
  sectors: IRegions[]
  regions: ISectors[]
}
export interface IOrganizations {
  title: string
  id?: string
}
export interface IRegions {
  title: string
  id?: string
}
export interface ISectors {
  title: string
  id?: string
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

export interface ILearningStatusData {
  applicationForm: string[]
  category: string
  courseSettingMap: object[]
  courseStructure: string
  description: string
  id: string
  inputActivityId: string
  projectId: string
  sections: object[]
  status: string
  title: string

}

export interface ISetting {
  changeable: boolean | undefined
  id: string | undefined
  projectId: string | undefined
  title: string | undefined
}
export interface ISectionsSettingItem {
  active: boolean
  id: string
  sectionId: string
  sectionSettingId: string
  setting: ISetting
}

export interface ISectionData {
  active?: boolean | undefined
  activityTemplateId?: string
  id: string
  projectId: string
  requiredDocuments: []
  sectionSettingMap: ISectionsSettingItem[]
  title: string
  type: string
}
export interface ILearningStatus {
  section: ISectionData
  data: ILearningStatusData
  refetch: any
  index: number
}

export interface IRequiredDocuments {
  documentName: string
  documentCount: number
  id: string
  title?: string
  count?: string
}

export interface IAddRequiredDocument {
  isOpenAddDocumentsModal: boolean
  setIsOpenAddDocumentsModal: React.Dispatch<React.SetStateAction<boolean>>
  sectionId: string
  refetch: any
}

export interface IAddedDocuments {
  requiredDocuments: IRequiredDocuments[]
  refetch: any
}

export interface ICreatedFieldItem {
  answerType: string
  changeable: true
  data: string[]
  description: null | string
  id: string
  projectId: string
  title: string
  type: string
  setting?: any
  active?: boolean
  helpText?: string
}

export interface ICreateFieldsProps {
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
  questionType: string
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
  item: ICreatedFieldItem | null
  setItem: React.Dispatch<React.SetStateAction<ICreatedFieldItem | null>>
}

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
  item: ICreatedFieldItem
  setItem: React.Dispatch<React.SetStateAction<ICreatedFieldItem | null>>
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
  helpTextValue: IHelpText[]
  setHelpTextValue: React.Dispatch<React.SetStateAction<IHelpText[]>>
  refetch: any
}

export type SetProjectId = (id: string) => void

export type ResultAreaOrder = (index: number) => number

export interface IProjectTemplate {
  courseStructure: string
  title: string
  id: string
  description: string
  status: string
}

export interface ISubActivityAndTemplates {
  templates: IProjectTemplate[]
  refetch: any
  subActivities: ISubActivities[]
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>
  setIndeterminate: React.Dispatch<React.SetStateAction<boolean>>
  setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>
  checkAll: boolean
  indeterminate: boolean
  checkedList: CheckboxValueType[] | undefined
  setDateSearch: React.Dispatch<React.SetStateAction<IDataSearchchSubActivity>>
  dateSearch: IDataSearchchSubActivity
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IResultAreasTitles {
  title: string
  projectItems: number
  index: number
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

export interface ITabContent {
  inputActivityId: string | undefined
  resultArea: IResultAreas
  setInputActivityId: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
  defaultInputActivityId: string
}

export interface ISubActivitiesProps {
  subActivities: ISubActivities[] | undefined
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>
  setIndeterminate: React.Dispatch<React.SetStateAction<boolean>>
  setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>
  checkAll: boolean
  indeterminate: boolean
  checkedList: CheckboxValueType[] | undefined
  setDateSearch: React.Dispatch<React.SetStateAction<IDataSearchchSubActivity>>
  dateSearch: IDataSearchchSubActivity
  templates: IProjectTemplate[]
}
export interface ISubActivities {
  title: string
  startDate: string
  endDate: string
  subActivity: {
    status: string
    region: {
      title: string
    }
    sector: {
      title: string
    }
  }
}

export interface IStatusFilter {
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>
  setIndeterminate: React.Dispatch<React.SetStateAction<boolean>>
  setCheckedList: React.Dispatch<React.SetStateAction<CheckboxValueType[] | undefined>>
  checkAll: boolean
  indeterminate: boolean
  checkedList: CheckboxValueType[] | undefined
}
export interface IActiveTemplate {
  templates: IProjectTemplate[]
  refetch: any
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IDataSearchchSubActivity {
  from: string
  to: string
  start: boolean
}

export interface IDateFilterCards {
  setDateSearch: React.Dispatch<React.SetStateAction<IDataSearchchSubActivity>>
  dateSearch: IDataSearchchSubActivity
  setOpen?: any
}
export type StepsHeaderText = (mode: string) => string

export interface IStepsUpdate { isUpdate: boolean }

export interface IResultsUpdate { createOrUpdate: Void, isUpdate: boolean }

export interface IAddActivity {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
  templates: IProjectTemplate[]
}

export interface IAttachmentSetting {
  setting: ISetting
}