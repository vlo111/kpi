import { UseQueryResult } from '@tanstack/react-query';

export interface SearchApplicants {
  filters: any
  serachData: any
}
export interface DataType {
  key: React.Key
  name: string
  sector: string
  age: string
  education: string
  course: string
  status: string
  regions: string
  phoneNumber: string
  gender: string
  student: string
  vulnerability: string
  workOrganisation: string
  informedAboutUs: string
}
export interface ApplicatnList {
  allApplicants: string
  refetch: () => Promise<UseQueryResult>
  searchAplicant: string
  search: string
  showNote: boolean
  applicantsFilter: string
}
export interface IListeApplicants {
  data: DataType[]
}
export interface filterApplicants {
  filters: string
  onFinish: iFinishApplicant
}
export interface iFinishApplicant {
  gender: string
  age: number[]
  student: boolean
  statuses: string[]
  income: boolean
  disability: boolean
  regions: string[]
}
export interface IPagination {
  current: number
  pageSize: number
  showSizeChanger: boolean
  total: number
}

export interface IprevState {
  age: any
  disability: boolean
  gender: string
  income: boolean
  regions: string[]
  statuses: string[]
  student: boolean
}

export interface Idata {
  count: number
  has_more: boolean
  result: [
    {
      id: string
    }
  ]

}
export interface Iseacrh {
  search: string
  limit: number
  offset: number
  gender: string
}
