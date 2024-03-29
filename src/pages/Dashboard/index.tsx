import React from 'react';
import styled from 'styled-components';
import { Row, Col, Tabs } from 'antd';
import DefaultAnalytics from '../../components/Dashboard/DefaultAnalytics/Index';
// import CustomReport from '../../components/Dashboard/CustomReport/Index';
import useGetDashboardData from '../../api/Dashboard/useGetDashboardData';
import { ReactComponent as Analytics } from '../../assets/icons/analytics.svg';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import AsnSpin from '../../components/Forms/Spin';

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
    width: 100%;
  }
`;

const AnalyticsTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5rem 0rem 1rem 2rem;
`;

const Dashboard: React.FC = () => {
  const { id: projectId } = useParams();
  const { data, isLoading } = useGetDashboardData(projectId, true);

  if (isLoading === true) {
    return <AsnSpin />;
  }

  return (
    <>
      <AnalyticsTitle>
        <Analytics />
        <span
          style={{
            fontSize: 'var(--headline-font-size)',
            color: 'var(--dark-border-ultramarine)',
            borderRight: '2px solid var(--dark-border-ultramarine)',
            padding: '0px 10px 0px 7px'
          }}
        >
          {data?.title}
        </span>
        <span
          style={{
            fontSize: 'var(--base-font-size)',
            color: 'var(--dark-2)',
            padding: '0px 10px'
          }}
        >
          {moment(data?.startDate).format('DD/MM/YYYY')} - {' '}
          {moment(data?.endDate).format('DD/MM/YYYY')}
        </span>
      </AnalyticsTitle>
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
              children: <DefaultAnalytics data={data} />
            }
            // {
            //   label: 'Custom report',
            //   key: '2',
            //   children: <CustomReport />
            // }
          ]}
        />
        <Col></Col>
      </Row>
    </>
  );
};
export default Dashboard;
