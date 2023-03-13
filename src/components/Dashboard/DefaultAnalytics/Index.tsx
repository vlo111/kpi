import React from 'react';
import { Row } from 'antd';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';
import DemoColumn from '../AnalyticFilter';

const DefaultAnalytics: React.FC = () => {
  return (
    <Row
      style={{
        width: '100%'
      }}
    >
      <GeneralInformation />
      <SubmittedApplications />
      {/* <div
        style={{
          width: '100%'
        }}
      > */}
        <DemoColumn />
      {/* </div> */}
    </Row>
  );
};
export default DefaultAnalytics;
