import { Moment } from 'moment'
import React from 'react'
import { FormListFieldData } from 'antd'
import { RuleObject } from 'antd/lib/form'

export type DisabledDate = (current: Moment, item: string) => boolean

export type Date = Moment | null

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
  }
) => {
  rules: [
    { required: true },
    { min: number, message: string },
    { max: number, message: string },
    {
      pattern: RegExp
      message: string
    }
  ]
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

export type ManagerFieldType = (
  manager: IManager | null
) => Array<{ name: string[], value: string | undefined }>

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
  subActivity?: boolean
}

export interface ActivityNamesProps {
  names: string[]
  activeName: number | undefined
  setActiveName: React.Dispatch<React.SetStateAction<number | undefined>>
  subActivity?: boolean
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

export interface ICreateTemplate {
  isOpenCreateActivityModal: boolean
  setIsOpenCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IAddRequiredDocument {
  isOpenAddDocumentsModal: boolean
  setIsOpenAddDocumentsModal: React.Dispatch<React.SetStateAction<boolean>>
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

export type InputResultTitle = (
  id: string,
  prefix: string,
  placeholder: string
) => JSX.Element

export interface IProjectDetailsItems {
  name: string
  onDelete: (remove: (name: string) => void, fields: string) => void
}

export type OpenDeleteResultModal =
  | { remove: (name: string) => void, fields: string }
  | undefined

export type SetResultArea = (values: FormData) => void

export type SetTitleColor = (element: HTMLElement, color: string) => void

export type CollapseHeader = (
  key: number | string,
  name: Array<number | string>,
  index: string,
  placeholder: string,
  className: string
) => JSX.Element

export interface ProjectInputBoxProps {
  resultId: number
  activityId?: number
  type: string
  list: FormListFieldData[]
  add: (defaultValue?: any, insertIndex?: number | undefined) => void
  remove: (index: number | number[]) => void
  onDelete: (remove: (index: number | number[]) => void, field: number) => void
}

export type ProjectTargetRule = (
  max: number
) => Array<
| (() => { validator: (_: RuleObject, value: any) => Promise<void> })
| { required: boolean, message: string, pattern: RegExp }
>

export interface ILearningStatus {
  fields: FormListFieldData[]
  field: FormListFieldData
  remove: (index: number | number[]) => void
}
export interface OverviewProps {
  subActivity?: boolean
}
