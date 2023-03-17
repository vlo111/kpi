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
  return (
    <DefaultAnalyticsContainer>
      <GeneralInformation />
      <SubmittedApplications />
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
