import React, { useState } from 'react';
import { Badge, Row, Space, Tabs, Typography } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../../Forms/Button';
import DefaultContent from './DefaultContent';
import ApplicantsForm from './SubActivityForms/Applicant/Applicant';
import SelectionForm from './SubActivityForms/Selection';
import PreAssessmentForm from './SubActivityForms/PreAssessment';
import ParticipantForm from './SubActivityForms/Participant';
import PostAssessmentForm from './SubActivityForms/PostAssessment';
import { ReactComponent as Settings } from '../../../../assets/icons/setting.svg';

const SectionsWrapper = styled.div`
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
    border: 1px solid var(--primary-light-orange);
  }
  .ant-tabs-top > .ant-tabs-nav:before {
    border-bottom: 3px solid var(--primary-light-orange);
    bottom: auto;
    right: 2.9%;
    left: 4.6%;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0 0 1.6vh;
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
      background: var(--primary-light-orange) !important;
    }
  }
  .ant-space-item {
    width: 100%;
  }
  .ant-space-align-center {
    text-align: center;
  }
`;

const SubActivitySections: React.FC = () => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const [tabDisable, setTabDisable] = useState(true);

  return (
    <SectionsWrapper>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title
          level={4}
          style={{
            color: 'var(--dark-border-ultramarine)',
            fontWeight: 'var(--font-normal)',
            marginRight: '8vw',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Course Roadmap
          <Settings className="settings_svg" />
        </Title>
        <Tabs>
          <TabPane forceRender key="7">
            <Row justify="center">
              <AsnButton
                type="primary"
                className="primary"
                style={{ width: '35vw' }}
                onClick={() => setTabDisable(false)}
              >
                Start Course
              </AsnButton>
            </Row>
            <DefaultContent />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Applicant</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Application form</Title>
              </Space>
            }
            key="1"
          >
            <ApplicantsForm />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Selection</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Selection interview</Title>
              </Space>
            }
            key="2"
          >
            <SelectionForm />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Pre-assessment</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Pre-assessment form</Title>
              </Space>
            }
            key="3"
          >
            <PreAssessmentForm />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Participant</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Attendance form</Title>
              </Space>
            }
            key="4"
          >
            <ParticipantForm />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Post-assessment</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Post-assessment form</Title>
              </Space>
            }
            key="5"
          >
            <PostAssessmentForm />
          </TabPane>
          <TabPane
            disabled={tabDisable}
            tab={
              <Space direction="vertical" align="center">
                <Title level={4}>Trained</Title>
                <Badge color="var(--primary-light-orange)" />
                <Title level={5}>Test</Title>
              </Space>
            }
            className="test"
            key="6"
          >
            <DefaultContent />
          </TabPane>
        </Tabs>
      </Space>
    </SectionsWrapper>
  );
};

export default SubActivitySections;
