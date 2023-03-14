import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { ISubActivityAndTemplates, IOutletContext } from '../../../types/project';
import { ActiveTempalate } from './ActiveTemplate';
import { SubActivity } from './SubActivities';

const Tab = styled.div`
.ant-tabs-ink-bar{
  display: block !important;
  color: var(--dark-2);
}
.ant-tabs-tab-btn{
  background: var(--white);
}
.ant-tabs-top>.ant-tabs-nav:before{
  border-bottom: none !important;
}
  .ant-tabs {
    .ant-tabs-nav,
    .ant-tabs > div > .ant-tabs-nav {
      position: inherit !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--dark-2) !important;
    }
    .ant-tabs-ink-bar {
      background: var(--dark-2) !important;
    }
  }
  .ant-tabs-tab:hover {
    color: var(--dark-2) !important;
  }
  .ant-tabs-content-holder{
  box-shadow: none !important;
  padding-top: 10px !important;
}
`;

const SubActivityAndTemplates: React.FC<ISubActivityAndTemplates> = ({
  templates,
  refetch,
  subActivities,
  setCheckAll,
  setIndeterminate,
  setCheckedList,
  checkAll,
  indeterminate,
  checkedList,
  setDateSearch,
  dateSearch,
  setIsOpenCreateActivityModal,
  inputActivityId,
  setAssignedUsersIds,
  resultAreaOrder,
  resultAreaTitle,
  activityTitle,
  setActiveTemplate,
  activeTemplate
}) => {
  const { projectOverview: { templateTab }, setProjectOverview, projectOverview } = useOutletContext<IOutletContext>();

  const handleTabChange = (activeKey: string): void => {
    setActiveTemplate(activeKey);
    if (templateTab !== undefined) {
      setProjectOverview({
        ...projectOverview,
        templateTab: undefined
      });
    }
  };
  return (
    <Tab>
      <Tabs
        defaultActiveKey={templateTab ?? activeTemplate}
        style={{
          color: 'var(--dark-2) !important',
          fontSize: 'var(--base-font-size) !important'
        }}
        onChange={(activeKey) => handleTabChange(activeKey)}
      >
        <Tabs.TabPane tab="Sub Activities" key="1">
          <SubActivity
            subActivities={subActivities}
            setCheckAll={setCheckAll}
            setIndeterminate={setIndeterminate}
            setCheckedList={setCheckedList}
            checkAll={checkAll}
            indeterminate={indeterminate}
            checkedList={checkedList}
            inputActivityId={inputActivityId}
            setAssignedUsersIds={setAssignedUsersIds}
            setDateSearch={setDateSearch}
            dateSearch={dateSearch}
            templates={templates}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Templates " key="2">
          <ActiveTempalate
            templates={templates}
            refetch={refetch}
            setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
            resultAreaOrder={resultAreaOrder}
            inputActivityId={inputActivityId}
            resultAreaTitle={resultAreaTitle}
            activityTitle={activityTitle}
            setActiveTemplate={setActiveTemplate}
          />
        </Tabs.TabPane>
      </Tabs>
    </Tab>
  );
};

export default SubActivityAndTemplates;
