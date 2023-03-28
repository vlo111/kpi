import React from 'react';
import styled from 'styled-components';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import { TitleContainer } from '../dashboardStyle';
import AgeDistribution from '../Charts/AgeDistribution';
import TrainedByGender from '../Charts/TrainedByGender';
import DroppedPWD from '../Charts/DroppedPWD';
import NotEnrolledPWD from '../Charts/NotEnrolledPWD';
import RegionBreakdown from '../Charts/RegionBreakdown';
import SectorBreakdown from '../Charts/SectorBreakdown';
import PWDApplicants from '../Charts/PWDApplicants';
import ActiveCourses from '../Charts/ActiveCourses';
import CompletedApplicants from '../Charts/CompletedApplicants';
import useGetDashboardData from '../../../api/Dashboard/useGeatDashboardData';

const DefaultAnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
  margin-bottom: 2rem;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const DefaultAnalytics: React.FC = () => {
  // const projectId = localStorage.getItem('project');

  const { data } = useGetDashboardData(
    '19e3c880-4bf4-424a-9ad4-4af293f55b47',
    true
  );

  return (
    <DefaultAnalyticsContainer>
      <GeneralInformation generalData={data?.general_info} />
      <SubmittedApplications submittedData={data?.submitted_info} />
      <ChartsContainer>
        <TitleContainer>Data Analytics Filter</TitleContainer>
        <RowContainer>
          <RegionBreakdown regionStatistics={data?.regions_statistic} />
        </RowContainer>
        <RowContainer>
          <AgeDistribution ageStatistics={data?.age_statistic} />
          <TrainedByGender genderStatistics={data.gender_statistic} />
        </RowContainer>
        <RowContainer>
          <NotEnrolledPWD
            pwdNotEnrolled={data?.pwd_applicants_not_enrolled}
          />
          <DroppedPWD
            pwdDropped={data?.pwd_applicants_dropped}
          />
        </RowContainer>
        <RowContainer>
          <PWDApplicants
            pwdStatistics={data?.pwd_applicants_trined}
          />
          <SectorBreakdown sectorStatistics={data.sectors_statistic} />
        </RowContainer>
        <RowContainer>
          <ActiveCourses
            activeCoursesStatistics={data?.applicants_status_statistic}
          />
          <CompletedApplicants
            completedStatistics={
              data?.applicants_status_in_done_courses_statistic
            }
          />
        </RowContainer>
      </ChartsContainer>
    </DefaultAnalyticsContainer>
  );
};
export default DefaultAnalytics;
