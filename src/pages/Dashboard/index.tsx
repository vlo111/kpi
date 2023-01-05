import React from 'react';
import { Row, Col } from 'antd';

const Dashboard: React.FC = () => {
  const getApplicationForm = (applicationId: string, opton: any): any => {
    const { data, refetch } = getApplicationForm(applicationId, opton);
    console.log(data, 'datata', refetch);
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={() => getApplicationForm('252690da-848e-4c5a-b00d-96f398deca06', {})}>Get Application form</button>

      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
