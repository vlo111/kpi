import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export interface IStatusItem {
  name?: string
  value?: string
  id?: string
  firstname?: string
  lastname?: string
  title?: string
}

export interface IOrganizationItem {
  title: string
  id: string
}
export interface IAssignedPeopleItem {
  id: string
  photo: string
  firstname: string
  lastname: string
}

export interface IFilteredData {
  [key: string]: string[] | undefined | string | CheckboxValueType[] | any
  status?: string[] | undefined
  assigned?: string[] | undefined
  startDate?: string | undefined
  endDate?: string | undefined
  courseTitle?: string | undefined
  courseDescription?: string | undefined
  organizations?: string[] | undefined
  sectors?: string[] | undefined
  regions?: string[] | undefined
  duration?: string | undefined
  teachingModes?: string[] | undefined
  partnerOrganization?: string | undefined
}

export interface IPagination {
  current: number
  pageSize: number
  total?: number
}

export interface IFilteredPeople {
  id: string
  photo: string | null
  firstname: string
  lastname: string
  emailVerified?: boolean
}
export interface IFiltered {
  id: string
  title: string
}
export interface IAction {
  id: string
  subActivity: { id: string }
}
export interface IPartnerOrganization {
  data: { customInputs: Array<{ partner_organization: string }> }
}
export interface IDuration {
  data: { durationInfo: { duration: string } }
}
export interface ITeachingMode {
  data: { teachingMode: string }
}
export interface IRegion {
  subActivity: { region: { title: string } }
}
export interface ISector {
  subActivity: { sector: { title: string } }
}
export interface IOrganization {
  subActivity: { organization: { title: string } }
}
export interface IAssignees {
  emailVerified?: boolean
  id: string
  firstName: string
  lastName: string
  photo: string
}

export interface IAssigneesProps {
  record: IAssignees[]
}

export interface IAssignedPeople {
  subActivity: {
    assignees: Array<{
      firstName: string
      lastName: string
      id: string
      photo: string
    }>
  }
}
export interface ISubActivitiesManager {
  manager: { firstName: string, lastName: string }
}

export interface IAllFiltered {
  assignees: IFilteredPeople[]
  id: string
  manager: IFilteredPeople[]
  organizations: IFiltered[]
  sectors: IFiltered[]
}

export type AssignedPeopleItemType = (item: IAssignedPeopleItem) => {
  name: string
  value: string
  id: string
};

export type TAction = (e: any, id: string) => void;
export type TColumnType = (
  setOpenCreateSubActivity: React.Dispatch<React.SetStateAction<boolean>>,
  setInputActivityId: React.Dispatch<React.SetStateAction<string>>,
  filterData: IAllFiltered,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckboxValues: React.Dispatch<React.SetStateAction<CheckboxValueType[] | []>>,
  checkboxValues: CheckboxValueType[] | []
) => any;

export type TSearchPropsCheckboxType = (
  dataIndex: string,
  filteredValue: IStatusItem[],
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string,
  setCheckboxValues: React.Dispatch<React.SetStateAction<CheckboxValueType[] | []>>,
  checkboxValues: CheckboxValueType[] | []
) => any;

export type TColumnCalendarPropsType = (
  dataIndex: string,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string,
) => any;

export type TSearchPropsType = (
  dataIndex: string,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string
) => any;

export type TChangeEventType = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;
export type TChangeEventTypes = (checkedValue: CheckboxValueType[]) => void;
