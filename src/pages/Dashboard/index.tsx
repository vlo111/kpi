import React from 'react';
import styled from 'styled-components';
import { Row, Col, Tabs } from 'antd';
import DefaultAnalytics from '../../components/Dashboard/DefaultAnalytics/Index';
import CustomReport from '../../components/Dashboard/CustomReport/Index';

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0px !important;
  }
  .ant-tabs-tab-btn {
    color: var(--dark-2);
    font-size: var(--headline-font-size);
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--dark-border-ultramarine);
    font-size: var(--headline-font-size);
  }
  .ant-tabs-ink-bar {
    border-bottom: 2px solid var(--dark-border-ultramarine) !important;
  }

  &.ant-tabs-top > .ant-tabs-nav:before {
    border-bottom: 1px solid #ebebeb !important;
  }

  .ant-tabs-content-holder {
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
        width: '100%',
        padding: '2rem 2rem 4rem'
      }}
    >
      <CustomTabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Default Analytics',
            key: '1',
            children: <DefaultAnalytics />
          },
          {
            label: 'Custom report',
            key: '2',
            children: <CustomReport />
          }
        ]}
      />
      <Col></Col>
    </Row>
  );
};
export default Dashboard;
