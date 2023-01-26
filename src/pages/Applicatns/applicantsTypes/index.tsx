
export interface SearchApplicants {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
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
  searchAplicant: any
  search: string

}
export interface IListeApplicants {
  data: DataType[]

}
