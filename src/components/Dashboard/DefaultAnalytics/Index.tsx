import React from 'react';
import styled from 'styled-components';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import { TitleContainer } from '../dashboardStyle';
import AgeDistribution from '../Charts/AgeDistribution';
import TrainedByGender from '../Charts/TrainedByGender';
import DroppedNotEnrolled from '../Charts/DroppedNotEnrolled';
import TrainedApplicants from '../Charts/TrainedApplicants';
import RegionBreakdown from '../Charts/RegionBreakdown';
import SectorBreakdown from '../Charts/SectorBreakdown';
import PWDApplicants from '../Charts/PWDApplicants';
import ActiveCourses from '../Charts/ActiveCourses';
import CompletedApplicants from '../Charts/CompletedApplicants';
import useGetDashboardData from '../../../api/Dashboard/useGeatDashboardData';

const DefaultAnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 82vw;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const DefaultAnalytics: React.FC = () => {
  // const projectId = localStorage.getItem('project');

  const { data, isLoading } = useGetDashboardData(
    '19e3c880-4bf4-424a-9ad4-4af293f55b47',
    true
  );
  console.log(data.general_info, isLoading);

  return (
    <DefaultAnalyticsContainer>
      <GeneralInformation generalData = {data.general_info}/>
      <SubmittedApplications submittedData = {data.submitted_info}/>
      <ChartsContainer>
        <TitleContainer>Data Analytics Filter</TitleContainer>
        <RowContainer>
          <AgeDistribution />
          <TrainedByGender />
        </RowContainer>
        <RowContainer>
          <DroppedNotEnrolled />
          <TrainedApplicants />
        </RowContainer>
        <RowContainer>
          <RegionBreakdown />
        </RowContainer>
        <RowContainer>
          <PWDApplicants />
          <SectorBreakdown />
        </RowContainer>
        <RowContainer>
          <ActiveCourses />
          <CompletedApplicants />
        </RowContainer>
      </ChartsContainer>
    </DefaultAnalyticsContainer>
  );
};
export default DefaultAnalytics;
