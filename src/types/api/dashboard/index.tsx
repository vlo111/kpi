import { Datum } from '@ant-design/charts';

export interface IGeneralInformation {
  title: string
  count: number
  icon?: {
    icon: HTMLElement
  }
}

export interface IGeneralInformationProps {
  generalData: IGeneralInformation[]
}

export interface ISubmittedApplications {
  count: number
  title: string
  trained_applicants_percent: number
}

export interface ISubmittedApplicationsIcon {
  count: number
  title: string
  trained_applicants_percent: number
  icon?: {
    icon: HTMLElement
  }
}

export interface ISubmittedApplicationsProps {
  submittedData: ISubmittedApplications[]
}

export interface IAnalyticsCardProps {
  borderLeftProp: string
  cardData: ISubmittedApplicationsIcon | IGeneralInformation
}

export interface IAgeDistribution {
  name: string
  type: string
  percent: number
  count: number
}

export interface IAgeDistributionProps {
  ageStatistics: IAgeDistribution[]
}

export interface ITrainedByGender {
  type: string
  name: string
  percent: number
  count: number
}

export interface ITrainedByGenderProps {
  genderStatistics: ITrainedByGender[]
}

export interface IRegionBreakdown {
  type: string
  name: string
  percent: number
  count: number
}

export interface IRegionBreakdownProps {
  regionStatistics: IRegionBreakdown[]
}

export interface IPWDApplicants {
  type: string
  name: string
  percent: number
  count: number
}

export interface IPWDApplicantsProps {
  pwdStatistics: IPWDApplicants[]
}

export interface ISectorBreakdown {
  type: string
  name: string
  percent: number
  count: number
}

export interface ISectorBreakdownProps {
  sectorStatistics: ISectorBreakdown[]
}

export interface IActiveCourses {
  name: string
  status_all_applicants: number
  status_all_applicants_percent: number
}

export interface IActiveCoursesProps {
  activeCoursesStatistics: IActiveCourses[]
}

export interface ICompletedApplicants {
  name: string
  status_all_applicants: number
  status_all_applicants_percent: number
}

export interface ICompletedApplicantsProps {
  completedStatistics: ICompletedApplicants[]
}

export interface IAnalyticData {
  projectId?: string
  title?: string
  startDate?: string
  endDate?: string
  general_info: IGeneralInformation[]
  submitted_info: ISubmittedApplications[]
  gender_statistic: ITrainedByGender[]
  age_statistic: IAgeDistribution[]
  regions_statistic: IRegionBreakdown[]
  applicants_status_in_done_courses_statistic: ICompletedApplicants[]
  applicants_status_statistic: IActiveCourses[]
  sectors_statistic: ISectorBreakdown[]
  pwd_applicants_done_courses: IPWDApplicants[]
}

export interface IAnalyticDataProps {
  data: IAnalyticData
}

export type ConfigColorType = string | string[] | ((datum: Datum, defaultColor?: string) => string)
