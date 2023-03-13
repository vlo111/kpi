import React from 'react';
import styled from 'styled-components';
import { Row, Col, Tabs } from 'antd';
// import { AsnTabs } from '../../components/Forms/Tabs';
import DefaultAnalytics from '../../components/Dashboard/DefaultAnalytics/Index';
import CustomReport from '../../components/Dashboard/CustomReport/Index';

const CustomTabs = styled(Tabs)`

&.ant-tabs-top > .ant-tabs-nav:before {
    border-bottom: 1px solid #EBEBEB !important;
  }

  .ant-tabs-content-holder{
    background: var(--background) !important;
    box-shadow: none;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Row
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '80%'
      }}
    >
      <CustomTabs
        defaultActiveKey="1"
        items={[
          {
            label: 'DefaultAnalytics',
            key: '1',
            children: <DefaultAnalytics />
          },
          {
            label: 'CustomReport',
            key: '2',
            children: <CustomReport/>
          }
        ]}
      />
      <Col>
      </Col>
    </Row>
  );
};
export default Dashboard;
