export interface IStatusItem {
  name: string
  value: string
  id: string
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

export type AssignedPeopleItemType = (item: IAssignedPeopleItem) => { name: string, value: string, id: string }
