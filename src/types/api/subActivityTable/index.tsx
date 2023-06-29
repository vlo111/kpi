import { ColumnsType } from 'antd/es/table';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ColumnType } from 'antd/lib/table';

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
  duration?: undefined | number
  teachingModes?: string[] | undefined
  partnerOrganization?: string | undefined
  managers?: string[] | undefined
}
export interface IParams extends IFilteredData {
  limit: number
  offset: number
  total?: number
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

export interface IColumnsAction {
  setInputActivityId: React.Dispatch<React.SetStateAction<string>>
  setOpenCreateSubActivity: React.Dispatch<React.SetStateAction<boolean>>
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  record: IAction
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
  author: { firstName: string, lastName: string }
}

export interface IAllFiltered {
  assignees: IFilteredPeople[]
  id: string
  manager: IFilteredPeople[]
  organizations: IFiltered[]
  sectors: IFiltered[]
  regions: IFiltered[]
}

export type AssignedPeopleItemType = (item: IAssignedPeopleItem) => {
  name: string
  value: string
  id: string
};

export type TAction = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: string
) => void;
export type TOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type TOnSearchChangeNumber = (value: number | string | null) => void;
export type TColumnType = (
  setOpenCreateSubActivity: React.Dispatch<React.SetStateAction<boolean>>,
  setInputActivityId: React.Dispatch<React.SetStateAction<string>>,
  filterData: IAllFiltered,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckboxValues: React.Dispatch<React.SetStateAction<ICheckboxValues>>,
  checkboxValues: ICheckboxValues,
  setTablePagination: React.Dispatch<React.SetStateAction<IPagination>>,
  tablePagination: IPagination,
  inputValues: IInputValues,
  setInputValues: React.Dispatch<React.SetStateAction<IInputValues>>
) => ColumnsType<any>;

export interface UseAssessmentFormResult {
  data: { filterData: IAllFiltered, count: number, result: any }
  refetch: any
  isLoading: boolean
}

export interface IInputValues {
  [key: string]: string[] | string | CheckboxValueType[] | any
  courseTitle: string
  courseDescription: string
  duration: string | number
  partnerOrganization: string
}

export interface ICheckboxValues {
  [key: string]: string[] | string | CheckboxValueType[] | any
  status: string[] | []
  organizations: string[] | []
  managers: string[] | []
  assigned: string[] | []
  sectors: string[] | []
  regions: string[] | []
  teachingModes: string[] | []
}

export type TSearchPropsCheckboxType = (
  dataIndex: string,
  filteredValue: IStatusItem[],
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string,
  setCheckboxValues: React.Dispatch<React.SetStateAction<ICheckboxValues>>,
  checkboxValues: ICheckboxValues,
  setTablePagination: React.Dispatch<React.SetStateAction<IPagination>>,
  tablePagination: IPagination
) => ColumnType<IStatusItem>;

export type TColumnCalendarPropsType = (
  dataIndex: string,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string,
  tablePagination: IPagination,
  setTablePagination: React.Dispatch<React.SetStateAction<IPagination>>,
) => ColumnType<IFilteredData>;

export type TSearchPropsType = (
  dataIndex: string,
  setSearchData: React.Dispatch<React.SetStateAction<IFilteredData>>,
  searchData: IFilteredData,
  key: string,
  setTablePagination: React.Dispatch<React.SetStateAction<IPagination>>,
  tablePagination: IPagination,
  inputValues: IInputValues,
  setInputValues: React.Dispatch<React.SetStateAction<IInputValues>>
) => ColumnType<HTMLElement>;

export type TChangeEventType = (close: { (): void, (): void }) => void;
export type TChangeEventTypes = (checkedValue: CheckboxValueType[]) => void;
export type useGetProjectAllSubActivitiesListTypes = (
  id: string | undefined,
  params: IParams,
  options?: { enabled: boolean }
) => UseAssessmentFormResult;
