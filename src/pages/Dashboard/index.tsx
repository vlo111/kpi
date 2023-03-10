import React from 'react';
import { Row, Col } from 'antd';
import DefaultAnalytics from '../../components/Dashboard/DefaultAnalytics/Index';

const Dashboard: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col><DefaultAnalytics/> </Col>
    </Row>
  );
};
export default Dashboard;
