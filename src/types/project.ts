import { Moment } from 'moment'
import React from 'react'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

export type DisabledDate = (current: Moment, item: string) => boolean

export type Date = Moment | null

export type HandleSubmit = () => void

export interface StepProps {
  setStep: (b: boolean) => void
}

export type FormItemName = (
  name: string,
  label: string
) => { name: string, label: string }

export type Rules = (
  min: number,
  max: number
) => { rules: [{ required: boolean, min: number, max: number }] }

export type RulesPassword = (
  min: { min: number, message: string },
  max: { max: number, message: string },
  pattern: {
    pattern: RegExp
    message: string
  },
) => { rules: [{ required: true }, { min: number, message: string }, { max: number, message: string }, {
  pattern: RegExp
  message: string
}] }

export type InitResultAreaFields = (
  data: any,
  resultArea: IResultArea[]
) => Array<{ name: string[], value: string }>

export type InitGeneralInfoFields = (
  generalInfo: IGeneralInfo[]
) => Array<{ name: string[], value: string }>

export interface IAddManagers {
  setManagerModalOpen: (b: IManager | null) => void
  setAddManager: (b: any) => void
  manager: IManager | null
}

export interface IManager {
  id: string
  color: string
  firstName: string
  lastName: string
  email: string
  position: string
  assigned: string
}

export interface IManagerState {
  managers: IManager[]
  addNewManager: (manager: IManager) => void
  getManagerById: (id: string | null) => IManager | undefined
  deleteManagerById: (id: string | null) => void
  editManager: (manager: IManager) => void
}

export type ManagerFieldType = (
  manager: IManager | null
) => Array<{ name: string[], value: string | undefined }>

export interface IPanel {
  header: string
  list: IPanelData[]
  deleteData: HandlePanelDelete
  addData: HandlePanelAdd
}

export interface IPanelData {
  id: string
  name: string
}

export type HandlePanelDelete = (header: string, id: string) => void

export type HandlePanelAdd = (header: string) => void

export interface IPanelIsActive {
  isActive: boolean
}

export interface IExpectedResult {
  id: string
  code: string
  result: string
  measure: string
  target: string
}

export interface IActivity {
  id: string
  name: string
  milestones: IMilestones[]
}

export interface IMilestones {
  id: string
  code: string
  milestone: string
  measure: string
  target: string
}

export interface IResultArea {
  id: string
  name: string
  expectedResult: IExpectedResult[]
  activity: IActivity[]
}

export interface IGeneralInfo {
  title: string
  description: string
  startDate: Date
  endDate: Date
  managers: IManager[]
}

export interface IManagerIcon {
  letter: string
  color: string
  width?: string
  height?: string
  marginBottom?: string
  fontSize?: string
}

export interface IManagerOverview {
  id: string | null
  setOverview: any
}

export interface TabNames {
  tabNumber: number
  name: string
  zIndex: number
  active?: boolean
  handleActiveTab: React.Dispatch<React.SetStateAction<{}>>
  tabNames: object[]
}

export interface ActivityName {
  name: string
  active: number | undefined
  names: string[]
}

export interface activeTabName {
  number: null | number
  default: boolean
}

export interface TabName {
  name: string
}

export interface TabsNames {
  tabNames: TabName[]
  handleActiveTab: (tabNumber: any) => void
  activeTab: {
    number: number | null
    default: boolean
  }
}

export interface ActivityNamesProps {
  names: string[]
  activeName: number | undefined
  setActiveName: React.Dispatch<React.SetStateAction<number | undefined>>
}

export interface SubActivityProps {
  multiple: boolean
  activity: string
  subActivities: string[]
}
export interface GeneralInfoProps {
  title: string
  description: string
}
export interface ResultAndActivitiesProps {
  option: string
  description: string
  count: string
  divider: boolean
}

export interface ActivityNameProps {
  activityName: string
  divider: boolean
}
export interface ProjectsDetailProps {
  info: {
    title: string
    descriptions: string[]
  }
}
export type AddManagerHandle = (values: unknown) => void

export interface IDetail {
  name: string
  id: string
}

export type Details = IDetail[]

export interface IDetailsState {
  organizations: Details
  setOrganizations: (organization: IDetail[]) => void
  regions: Details
  setRegions: (region: IDetail[]) => void
  sectors: Details
  setSectors: (region: IDetail[]) => void
}

export interface ICreateTemplate {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
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

export interface ICreateFieldsProps {
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
  questionType: string
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
}

export interface IQuestionsRow {
  item: ITemplateData
  templateData: ITemplateData[]
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateData[]>>
  setQuestionType: React.Dispatch<React.SetStateAction<string>>
  setIsVisibleAddField: React.Dispatch<React.SetStateAction<boolean>>
}

export type InputResultTitle = (id: string, prefix: string, placeholder: string) => JSX.Element

export interface IProjectDetailsItems {
  name: string
  onDelete: (remove: (name: string) => void, fields: string) => void
}

export interface IProjectItemsBox {
  item: IExpectedResult | IMilestones
  index: number
  accessDelete: boolean
  onDelete: (item: string, id: string) => void
  form: FormInstance
}

export interface IInputAreaBoxProps {
  list: IExpectedResult[] | IMilestones[]
  resultAreaId: string
  activityId?: string
  form: FormInstance
}

export interface IExpectedResultProps {
  id: string
  results: IExpectedResult[]
  form: FormInstance
}

export interface IInputResultProps {
  resultArea: IResultArea[]
  form: FormInstance
}
