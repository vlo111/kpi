import React from 'react';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import DemoColumn from '../AnalyticFilter';

const DefaultAnalytics: React.FC = () => {
  return (

      <>
        <GeneralInformation />
        <SubmittedApplications />

          <DemoColumn />
          </>

  );
};
export default DefaultAnalytics;
