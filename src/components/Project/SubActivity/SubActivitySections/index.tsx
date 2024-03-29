import React, { useState } from 'react';
import { Badge, Row, Space, Tabs, Typography } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../../Forms/Button';
import DefaultContent from './DefaultContent';
import CourseStatusForm from './SubActivityForms/Applicant/CourseStatus';
import { colors } from '../../../../types/api/activity/subActivity';

const SectionsWrapper = styled.div<{ color: string | undefined }>`
  h4.ant-typography {
    font-size: var(--base-font-size);
    color: var(--dark-2);
    font-weight: var(--font-normal);
    margin: 0;
  }
  h5.ant-typography {
    font-size: var(--font-size-semismall);
    color: var(--dark-4);
    font-weight: var(--font-normal);
    margin: 0;
  }
  .ant-badge-status-dot {
    width: 32px;
    height: 32px;
    background: var(--background) !important;
    border: ${(props) =>
      `1px solid var(${
        props.color != null ? props.color : '--primary-light-orange'
      })`};
  }
  .ant-tabs-top > .ant-tabs-nav:before {
    border-bottom: ${(props) =>
      `3px solid var(${
        props.color != null ? props.color : '--primary-light-orange'
      })`};
    bottom: auto;
    right: 2.9%;
    left: 3%;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0 0 1.6vh;
  }
  .ant-tabs-tab {
    background: transparent !important;
  }
  .settings_svg {
    margin-left: 0.5vw;
    path {
      fill: var(--dark-border-ultramarine) !important;
    }
  }
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-between;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list .ant-tabs-tab:last-child::after {
    display: none !important;
  }
  .ant-tabs-tab:first-child {
    display: none;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  .ant-tabs-tab-active {
    .ant-badge-status-dot {
      background: ${(props) =>
        `var(${
          props.color != null ? props.color : '--primary-light-orange'
        }) !important`};
    }
  }
  .ant-space-item {
    width: 100%;
  }
  .ant-space-align-center {
    text-align: center;
  }
  .ant-tabs-tab-btn {
    position: relative;
    bottom: 13px
  }
`;

const SubActivitySections: React.FC<any> = ({
  activity,
  index,
  assignedUsers,
  applicationForm,
  refetch,
  navigateRouteInfo,
  applicants,
  setOffset,
  offset,
  applicantCounts,
  isLoading,
  setSearch,
  search,
  sectionsCount,
  tabIndex
}) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const [activeKey, setActiveKey] = useState<any>('1');
  const handleTabChange = (key: string): void => {
    setActiveKey(key);
  };
  const filteredColor = colors.filter((item) => item.index === index);

  return (
    <SectionsWrapper color={filteredColor[0]?.color}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Tabs
          activeKey={activeKey}
          onChange={handleTabChange}
          className="custom_section_tabs"
        >
          <TabPane forceRender key="1">
            {activity?.status === 'INACTIVE' && (
              <Row justify="center">
                <AsnButton
                  type="primary"
                  className="primary"
                  disabled={
                    activity?.status === 'INACTIVE' &&
                    activity?.applicants?.length === 0 &&
                    index !== 0
                  }
                  style={{ width: '35vw' }}
                  onClick={() => {
                    setActiveKey(
                      activity?.section?.sectionSettingMap[0]?.setting?.id
                    );
                  }}
                >
                  Start Course
                </AsnButton>
              </Row>
            )}
            <DefaultContent
              navigateRouteInfo={navigateRouteInfo}
              assignedUsers={assignedUsers}
              applicants={applicants}
              color={filteredColor[0]?.color}
              status={activity?.status}
              courseId={activity?.id}
              files={activity?.section?.files}
              requIredDocs={activity?.section?.requiredDocuments}
              setOffset={setOffset}
              offset={offset}
              applicantCounts={applicantCounts}
              isLoading={isLoading}
              setSearch={setSearch}
              search={search}
              sectionsCount={sectionsCount}
              tabIndex={tabIndex}
            />
          </TabPane>
          {activity?.section?.sectionSettingMap?.map((item: any) => (
            <TabPane
              disabled={activity?.status !== 'ACTIVE'}
              key={item?.setting?.id}
              tab={
                <Space direction="vertical" align="center">
                  <Title level={4}>{item?.setting?.title}</Title>
                  <Badge color="var(--primary-light-orange)" />
                </Space>
              }
            >
              <CourseStatusForm
                navigateRouteInfo={navigateRouteInfo}
                setActiveKey={setActiveKey}
                id={item?.setting?.id}
                courseStatus={activity?.status}
                statusTitle={item?.setting?.title}
                courseId={activity?.id}
                applicationForm={applicationForm}
                color={filteredColor[0]?.color}
                refetch={refetch}
              />
            </TabPane>
          ))}
        </Tabs>
      </Space>
    </SectionsWrapper>
  );
};

export default SubActivitySections;
