export interface IStatusItem {
  name?: string
  value?: string
  id?: string
  firstname?: string
  lastname?: string
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
  [key: string]: string[] | undefined | string
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

export type AssignedPeopleItemType = (item: IAssignedPeopleItem) => {
  name: string
  value: string
  id: string
};
