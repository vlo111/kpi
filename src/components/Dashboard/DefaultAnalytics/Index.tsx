import React from 'react';
import { Row, Col } from 'antd';
import GeneralInformation from '../GeneralInformation/Index';
import SubmittedApplications from '../SubmittedApplications';

const DefaultAnalytics: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>DefaultAnalytics</Col>
      <GeneralInformation/>
      <SubmittedApplications/>
    </Row>
  );
};
export default DefaultAnalytics;
