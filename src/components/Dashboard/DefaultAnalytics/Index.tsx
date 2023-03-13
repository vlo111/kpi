import React from 'react';
import { Row } from 'antd';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';

const DefaultAnalytics: React.FC = () => {
  return (
    <Row justify='center' align="top" style={{
      width: '100%'
    }}>
      <GeneralInformation/>
      <SubmittedApplications/>
    </Row>
  );
};
export default DefaultAnalytics;
