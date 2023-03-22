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

export interface IDroppedNotEnrolled {
  type: string
  percent: number
  count: number
}

export interface IDroppedNotEnrolledProps {
  notEnrolledStatistics: IDroppedNotEnrolled[]
}

export interface ITrainedApplicants {
  type: string
  percent: number
  count: number
}

export interface ITrainedApplicantsProps {
  trainedStatistics: ITrainedApplicants[]
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
