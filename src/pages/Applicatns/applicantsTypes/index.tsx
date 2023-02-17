import { UseQueryResult } from '@tanstack/react-query';
import { TVoid } from '../../../types/global';
import { FormInstance } from 'antd';
import React, { Key } from 'react';

export interface SearchApplicants {
  filters: any
  serachData: any
}
export interface DataType {
  key: Key
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
  age?: { from: number, to: number } | undefined
  search?: string
  limit?: number
  offset?: number
  disability?: boolean
  gender?: string
  income?: boolean
  regions?: string[]
  statuses?: string[]
  student?: boolean
}

export interface IfilterResult {
  filters: Iseacrh
  onFinish: TVoid
  form: FormInstance<string>
  setFilters: any
  refetch: () => Promise<UseQueryResult>
}
export interface IApplicants {
  data: never[]
  count: null
}

export interface Ifiltres {
  form: FormInstance<string>
  onFinish: () => void
  setOpen: () => boolean
}
