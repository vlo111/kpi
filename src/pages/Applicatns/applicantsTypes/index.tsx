
export interface SearchApplicants {
  filter: string
  serachData: React.Dispatch<React.SetStateAction<string>>
}
export interface DataType {
  key: React.Key
  name: string
  sector: string
  age: string
  education: string
  course: string
  status: string
  region: string
  phoneNumber: string
  gender: string
  student: string
  vulnerability: string
  workOrganisation: string
  informedAboutUs: string

}
export interface ApplicatnList {
  allApplicants: any
  refetch: any
  searchAplicant: any
  search: string
  showNote: any
  applicantsFilter: any

}
export interface IListeApplicants {
  data: DataType[]

}
export interface filterApplicants {
  valueFilter: any
  refetch: any
  onFinish: any

}
