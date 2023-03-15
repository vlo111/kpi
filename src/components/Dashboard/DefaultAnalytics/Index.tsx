import React from 'react';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import RegionBreakdown from '../Charts/RegionBreakdown';
import ActiveCourses from '../Charts/ActiveCourses';
import AgeDistribution from '../Charts/AgeDistribution';
import CompletedApplicants from '../Charts/CompletedApplicants';
import DroppedNotEnrolled from '../Charts/DroppedNotEnrolled';
import TrainedApplicants from '../Charts/TrainedApplicants';
import TrainedByGender from '../Charts/TrainedByGender';
import SectorBreakdown from '../Charts/SectorBreakdown';

const DefaultAnalytics: React.FC = () => {
  return (
    <>
      <GeneralInformation />
      <SubmittedApplications />
      <AgeDistribution />
      <RegionBreakdown />
      <ActiveCourses />
      <CompletedApplicants />
      <DroppedNotEnrolled />
      <TrainedApplicants />
      <TrainedByGender />
      <SectorBreakdown />
    </>
  );
};
export default DefaultAnalytics;
