import React from 'react';
import styled from 'styled-components';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import AgeDistribution from '../Charts/AgeDistribution';
import TrainedByGender from '../Charts/TrainedByGender';
import DroppedNotEnrolled from '../Charts/DroppedNotEnrolled';
import TrainedApplicants from '../Charts/TrainedApplicants';
import RegionBreakdown from '../Charts/RegionBreakdown';
import ActiveCourses from '../Charts/ActiveCourses';
import CompletedApplicants from '../Charts/CompletedApplicants';
import SectorBreakdown from '../Charts/SectorBreakdown';
import { TitleContainer } from '../dashboardStyle';

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
    <>
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
        <SectorBreakdown />
      </RowContainer>
      <RowContainer>
        <ActiveCourses />
        <CompletedApplicants />
      </RowContainer>
      </ChartsContainer>
    </>
  );
};
export default DefaultAnalytics;
